import { GameContext, GameState, MultiplayerGameState } from "../../entity";
import {
  calculateAdjacentTerritoryCounts,
  calculateTotalTerritoryCounts,
} from "../score";
import {
  battleEnded,
  getCurrentBattleTerritory,
  playerWhoStillHaveCardsCount,
} from "../utils";
import {
  endIf as battleEndIf,
  getOwnerOfMostCourtesans,
  redrawLogic,
} from "../events/battle";
import { TerritoryStatus } from "../../../utils/constants";
import _ from "lodash";

export const battleHasEnded = ({
  G,
  ctx,
}: {
  G: GameState;
  ctx: GameContext;
}) => {
  return !G.keepCardsPhaseActive && battleEnded(Object.values(G.players));
};

export const gameHasEnded = ({
  G,
  ctx,
}: {
  G: GameState;
  ctx: GameContext;
}) => {
  const adjacentWinner = adjacentTerritoryCondition({ G, ctx });
  return adjacentWinner ? adjacentWinner : totalTerritoryCondition({ G, ctx });
};

const adjacentWinTerritoryCount = (ctx: GameContext) => {
  const playerCount = ctx.numPlayers;
  return playerCount === 2 || playerCount === 3 ? 4 : 3;
};

const totalWinTerritoryCount = (ctx: GameContext) => {
  const playerCount = ctx.numPlayers;
  return playerCount === 2 || playerCount === 3 ? 6 : 5;
};

const adjacentTerritoryCondition = ({
  G,
  ctx,
}: {
  G: GameState;
  ctx: GameContext;
}) => {
  const adjacentTerritoryCounts = calculateAdjacentTerritoryCounts(G);
  const maxScore = adjacentTerritoryCounts
    .map((score) => score.score)
    .reduce((a, b) => Math.max(a, b));

  if (maxScore >= adjacentWinTerritoryCount(ctx)) {
    const winnerId = adjacentTerritoryCounts.find(
      (obj) => obj.score === maxScore
    )?.playerId;
    return { winner: winnerId };
  }
};

const totalTerritoryCondition = ({
  G,
  ctx,
}: {
  G: GameState;
  ctx: GameContext;
}) => {
  const totalTerritoryCounts = calculateTotalTerritoryCounts(G);
  const maxScore = totalTerritoryCounts
    .map((score) => score.score)
    .reduce((a, b) => Math.max(a, b));

  if (maxScore >= totalWinTerritoryCount(ctx)) {
    const winnerId = totalTerritoryCounts.find(
      (obj) => obj.score === maxScore
    )?.playerId;
    return { winner: winnerId };
  }
};

function getNextCondottiereTokenOwner(G: GameState, ctx: GameContext): string {
  // if this owner exists, he gets the token no matter what
  const battleStatus = battleEndIf({ G, ctx });
  const ownerOfMostCourtesans = getOwnerOfMostCourtesans(G);
  if (battleStatus?.draw) {
    // if it is a draw the owner of most courtesans gets the token,
    // else random player gets it
    return ownerOfMostCourtesans
      ? ownerOfMostCourtesans
      : (_.sample(Object.keys(G.players)) as string);
  }
  // else goes to the winner(if the owner of most courtesans doesn't exist)
  // courtesans FTW
  return ownerOfMostCourtesans
    ? ownerOfMostCourtesans
    : (battleStatus?.winner as string);
}

export const onBattleEnd = ({
  G,
  ctx,
}: {
  G: MultiplayerGameState;
  ctx: GameContext;
}) => {
  // take care of the one who receives the next condottiere token
  G.condottiereTokenOwnerId = getNextCondottiereTokenOwner(G, ctx);
  G.condottiereTokenOwnerHistory = [
    ...G.condottiereTokenOwnerHistory,
    G.condottiereTokenOwnerId,
  ];

  // transfer territory into the right hands
  const battleTerritory = getCurrentBattleTerritory(G.territories);
  const battleStatus = battleEndIf({ G, ctx });
  if (battleStatus?.draw) {
    battleTerritory.status = TerritoryStatus.FREE;
  } else if (battleStatus?.winner) {
    battleTerritory.status = TerritoryStatus.TAKEN;
    battleTerritory.owner = battleStatus?.winner;
  }
  // Multiplayer-only-code, so that the battle status can be broadcast to clients
  G.battleEnded = !!battleStatus;
  G.battleWinner = battleStatus?.winner;
};

/**
 * Empties battle lines and resolves passed status depending on hand
 * @param G Game state
 */
export const discardBattleLines = (G: MultiplayerGameState) => {
  const players = Object.values(G.players);
  players.forEach((player) => {
    // all battlelines are discarded
    G.discardPile.push(...player.battleLine);
    player.battleLine = [];
    player.passed = !player?.hand?.length ? true : false;
  });
};

/**
 *
 * @param G game state
 * handles round end (i.e dealing of new cards), if the condition is met
 */
export const advanceRound = (G: MultiplayerGameState) => {
  const players = Object.values(G.players);
  const remainingCount = playerWhoStillHaveCardsCount(players);
  if (remainingCount <= 1) {
    // when only one (or fewer) player still has cards left
    // we end the round by allowing the players to draw more cards
    redrawLogic(G, players);
  }
};

// This code fires before battle phase
export const onMapEnd = ({
  G,
  ctx,
}: {
  G: MultiplayerGameState;
  ctx: GameContext;
}) => {
  G.battleEnded = false;
  G.battleWinner = "";

  discardBattleLines(G);
  advanceRound(G);
};

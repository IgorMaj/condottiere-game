import { TerritoryStatus } from "../../../utils/constants";
import { fisherYatesShuffle, popMultiple } from "../../../utils/methods";
import { GameState, GameContext, PlayerState } from "../../entity";
import { calculateCourtesanCounts, calculateScores } from "../score";
import {
  allPlayersPassed,
  battleEnded,
  getCurrentBattleTerritory,
  getLastCondottiereOwnerPos,
  getPlayerTerritoryCount,
  isDraw,
  playerWhoStillHaveCardsCount,
} from "../utils";
import _ from "lodash";
import { onlyOnePlayerHasCards } from "./keep-cards";

export const endIf = ({ G, ctx }: { G: GameState; ctx: GameContext }) => {
  const playerStates = Object.values(G.players);
  // This condition means that we are in a special 'keepCards' phase
  // where the last card carrying player can elect to keep up to to two cards
  // before eventually passing as well
  if (G.keepCardsPhaseActive) {
    return;
  }
  if (!battleEnded(playerStates)) {
    return;
  }

  const scoreObjs = calculateScores(playerStates);
  // seems to happen in multiplayer
  if (!scoreObjs?.length) {
    return;
  }

  if (isDraw(scoreObjs)) {
    return { draw: true };
  }

  const maxScore = scoreObjs
    .map((score) => score.score)
    .reduce((a, b) => Math.max(a, b));

  // find the winner and assign the territory to them
  const winnerId = scoreObjs.find((obj) => obj.score === maxScore)?.playerId;
  return { winner: winnerId };
};

// this method modifies the state after the battle has concluded
// so more battles and rounds can be played
export const afterBattle = (G: GameState, ctx: GameContext): GameState => {
  G = _.cloneDeep(G);
  onBattleEnd({ G, ctx });
  return G;
};

export const onBattleEnd = ({ G, ctx }: { G: GameState; ctx: GameContext }) => {
  G.condottiereTokenOwnerId = getNextCondottiereTokenOwner(G, ctx);
  G.condottiereTokenOwnerHistory = [
    ...G.condottiereTokenOwnerHistory,
    G.condottiereTokenOwnerId,
  ];
  const players = Object.values(G.players);
  const remainingCount = playerWhoStillHaveCardsCount(players);
  players.forEach((player) => {
    // all battlelines are discarded
    G.discardPile.push(...player.battleLine);
    player.battleLine = [];
    player.passed = !player?.hand?.length ? true : false;
  });

  // transfer territory into the right hands
  const battleTerritory = getCurrentBattleTerritory(G.territories);
  if (ctx?.gameover?.draw) {
    battleTerritory.status = TerritoryStatus.FREE;
  } else if (ctx?.gameover?.winner) {
    battleTerritory.status = TerritoryStatus.TAKEN;
    battleTerritory.owner = ctx?.gameover?.winner;
  }

  if (remainingCount <= 1) {
    // when only one (or fewer) player still has cards left
    // we end the round by allowing the players to draw more cards
    redrawLogic(G, players);
  }
};

export function redrawLogic(G: GameState, players: PlayerState[]) {
  // we add the discard pile back to the deck
  G.deck.push(...G.discardPile);
  G.discardPile = [];

  // reshuffle the deck (in-place)
  fisherYatesShuffle(G.deck);

  players.forEach((player) => {
    const toPop =
      10 -
      player.hand.length +
      getPlayerTerritoryCount(G.territories, player.id);
    player.hand.push(...popMultiple(G.deck, toPop));
    player.passed = false;
  });
}

export function getOwnerOfMostCourtesans(G: GameState): string | undefined {
  const playerStates = Object.values(G.players);
  const scoreObjs = calculateCourtesanCounts(playerStates);
  if (isDraw(scoreObjs)) {
    return undefined;
  }

  const maxScore = scoreObjs
    .map((score) => score.score)
    .reduce((a, b) => Math.max(a, b));
  const playerId = scoreObjs.find((obj) => obj.score === maxScore)?.playerId;
  return playerId;
}

function getNextCondottiereTokenOwner(G: GameState, ctx: GameContext): string {
  // if this owner exists, he gets the token no matter what
  const ownerOfMostCourtesans = getOwnerOfMostCourtesans(G);
  if (ctx?.gameover?.draw) {
    // if it is a draw the owner of most courtesans gets the token,
    // else random player gets it
    return ownerOfMostCourtesans
      ? ownerOfMostCourtesans
      : (_.sample(Object.keys(G.players)) as string);
  }
  // else goes to the winner(if the owner of most courtesans doesn't exist)
  // courtesans FTW
  return ownerOfMostCourtesans ? ownerOfMostCourtesans : ctx?.gameover?.winner;
}

export const first = ({ G, ctx }: { G: GameState; ctx: GameContext }) => {
  const playerStates = Object.values(G.players);
  if (allPlayersPassed(playerStates)) {
    // game should end anyway, so this num doesn't matter
    return 0;
  }
  let firstPos = getLastCondottiereOwnerPos(G);
  // return first player who hasn't passed(start from last condottiere token owner)
  while (G.players[ctx.playOrder[firstPos]]?.passed) {
    firstPos = (firstPos + 1) % ctx.numPlayers;
  }
  return firstPos;
};

export const next = ({ G, ctx }: { G: GameState; ctx: GameContext }) => {
  const playerStates = Object.values(G.players);
  if (allPlayersPassed(playerStates)) {
    return;
  }
  // we seek to find a player who hasn't passed
  // Loop through next position until we do
  let nextPos = (ctx.playOrderPos + 1) % ctx.numPlayers;
  while (G.players[ctx.playOrder[nextPos]].passed) {
    nextPos = (nextPos + 1) % ctx.numPlayers;
  }
  return nextPos;
};

/**
 *
 * @param object game state
 * @returns boolean indicating whether we should switch to keepCards phase
 */
export const shouldGoToKeepCards = (G: GameState) =>
  onlyOnePlayerHasCards(G) && battleEnded(Object.values(G.players));

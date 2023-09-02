import { Game, PlayerID, Reducer, State } from "boardgame.io";
import { Bot } from "boardgame.io/ai";
import { CreateGameReducer } from "boardgame.io/internal";
import { sum } from "lodash";

import {
  BISHOP_CLASS,
  CONDOTTIERE_TOKEN_ID,
  COURTESAN_CLASS,
  DRUMMER_CLASS,
  HEROINE_CLASS,
  MERCENARY_TYPE,
  POPE_SCORE_BONUS,
  POPE_TOKEN_ID,
  SPRING_CLASS,
  SURRENDER_CLASS,
  TerritoryStatus,
  WINTER_CLASS,
} from "../../../utils/constants";
import { findMaxByAttribute } from "../../../utils/methods";
import { GameContext, GameState, ICardModel } from "../../entity";
import {
  isEnemyTerritory,
  isPlayerTerritory,
  isPopeState,
  sleep,
} from "../utils";
import { AI_MOVE_DELAY } from "./constants";

export const MAP_AI = {
  enumerate: (G: GameState, ctx: GameContext) => {
    const moves: any = [];
    const playerId = G.players[ctx.currentPlayer].id;
    const freeTerritories = G.territories.filter(
      (t) => t.status === TerritoryStatus.FREE
    );

    if (G.popeTokenOwnerId === playerId) {
      moves.push(
        ...freeTerritories.map((t) => ({
          move: "setTokenOnTerritory",
          args: [t.name, POPE_TOKEN_ID],
        }))
      );
    }

    if (G.condottiereTokenOwnerId === playerId) {
      moves.push(
        ...freeTerritories.map((t) => ({
          move: "setTokenOnTerritory",
          args: [t.name, CONDOTTIERE_TOKEN_ID],
        }))
      );
    }

    return moves;
  },
};

/**
 * Custom map bot which implements a specialized algorithm
 */

interface MapBotState {
  score: number;
  state: State; // contains G and ctx
  move: any;
}

export class MapBot extends Bot {
  private reducer: Reducer;

  constructor({
    enumerate,
    seed,
    game,
  }: {
    enumerate: any;
    seed?: string | number;
    game: Game;
  }) {
    super({ enumerate, seed });
    this.reducer = CreateGameReducer({ game });
  }

  override async play(state: State, playerID: PlayerID) {
    await sleep(AI_MOVE_DELAY);
    const moves = this.enumerate(state.G, state.ctx, playerID);
    const botStates = moves.map((move) => {
      const childState = this.reducer(state, move);
      return generateState(childState, move, playerID);
    });

    return Promise.resolve({
      action: findMaxByAttribute(botStates, "score")?.move,
    });
  }
}

function generateState(
  childState: State,
  move: any,
  playerID: PlayerID
): MapBotState {
  return {
    state: childState,
    move: move,
    score: generateScore(childState, playerID),
  };
}

// Algorithm for score estimation

// for pope states
// simple - the more enemy territories the token is adjacent to, the better
// if the territory is adjacent to the player, then it is subject to
// slight penalization, because of potential blocking
function popeStateScore(childState: State, playerID: string): number {
  const territories = (childState.G as GameState).territories;
  const popeTerritory = territories.find(
    (t) => t.status === TerritoryStatus.POPE
  );
  const adjacentTerritories = popeTerritory?.adjacentTo ?? [];
  let score = 0;
  for (let adjacentTerritoryName of adjacentTerritories) {
    if (isEnemyTerritory(adjacentTerritoryName, territories, playerID)) {
      score += 5;
    } else if (
      isPlayerTerritory(adjacentTerritoryName, territories, playerID)
    ) {
      score -= 1;
    }
  }
  return score;
}

function estimateHandStrength(hand: ICardModel[]): number {
  let strength = 0;
  let alreadyHasDrummer = false;
  hand.forEach((card) => {
    if (card.type === MERCENARY_TYPE) {
      strength += card.value;
    } else if (card.class === COURTESAN_CLASS) {
      strength += 2;
    } else if (card.class === HEROINE_CLASS) {
      strength += 10;
    } else if (card.class === WINTER_CLASS) {
      strength += hand.find(
        (c) => c.class === HEROINE_CLASS || c.class === SPRING_CLASS
      )
        ? 10
        : 0;
    } else if (card.class === SPRING_CLASS) {
      strength += 6;
    } else if (card.class === DRUMMER_CLASS) {
      if (!alreadyHasDrummer) {
        strength += sum(
          hand.filter((c) => c.type === MERCENARY_TYPE).map((c) => c.value * 2)
        );
        alreadyHasDrummer = true;
      }
    } else if (card.class === BISHOP_CLASS) {
      strength += 5;
    } else if (card.class === SURRENDER_CLASS) {
      strength += sum(hand.map((c) => c.value)) * 10;
    }
  });

  return strength;
}

// A good hand has greater strength than 50% of all players
function hasGoodHand(childState: State, playerID: string): boolean {
  const gameState = childState.G as GameState;
  const estimatedStrengthsObj: any = {};
  Object.keys(gameState.players).forEach((key) => {
    estimatedStrengthsObj[key] = estimateHandStrength(
      gameState.players[key].hand
    );
  });

  const playerEstimatedStength: number = estimatedStrengthsObj[playerID];
  const estimatedStrengthArr: number[] = Object.values(estimatedStrengthsObj);
  return (
    estimatedStrengthArr.filter((elem) => playerEstimatedStength >= elem)
      .length >
    estimatedStrengthArr.length / 2
  );
}

// for condottiere states:
// Calculate strength of each hand
// if the player has a chance of winning (greater strength than most players (> 50%))
// pick states which places token so it's adjacent to the most player territories
// if a state also has a token which is adjacent to enemy territories,
// lower its score for each adjacent enemy territory
// if the player is unable to beat most opponents(< 50%)  place the token on a territory
// which is not adjacent to either the player or the enemies
// (lower the score for each adjacent taken territory)

function condottiereStateScore(
  childState: State,
  playerID: string,
  isGoodHand: boolean
): number {
  const territories = (childState.G as GameState).territories;
  const battleTerritory = territories.find(
    (t) => t.status === TerritoryStatus.BATTLE
  );
  let score = 0;
  if (isGoodHand) {
    battleTerritory?.adjacentTo?.forEach((terrName) => {
      if (isEnemyTerritory(terrName, territories, playerID)) {
        score -= 1;
      } else if (isPlayerTerritory(terrName, territories, playerID)) {
        score += 2;
      }
    });
    return score;
  } else {
    battleTerritory?.adjacentTo?.forEach((terrName) => {
      if (
        isEnemyTerritory(terrName, territories, playerID) ||
        isPlayerTerritory(terrName, territories, playerID)
      ) {
        score -= 1;
      }
    });
    return score;
  }
}

function generateScore(childState: State, playerID: string): number {
  const popeState = isPopeState(childState);
  if (popeState) {
    return POPE_SCORE_BONUS + popeStateScore(childState, playerID);
  } else {
    const goodHand = hasGoodHand(childState, playerID);
    return condottiereStateScore(childState, playerID, goodHand);
  }
}

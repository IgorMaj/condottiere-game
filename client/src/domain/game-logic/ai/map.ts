import { Game, PlayerID, Reducer, State } from 'boardgame.io';
import { Bot } from 'boardgame.io/ai';
import { CreateGameReducer } from 'boardgame.io/internal';

import {
  CONDOTTIERE_TOKEN_ID,
  POPE_TOKEN_ID,
  TerritoryStatus,
} from '../../../utils/constants';
import { findMaxByAttribute } from '../../../utils/methods';
import { GameContext, GameState } from '../../entity';

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
          move: 'setTokenOnTerritory',
          args: [t.name, POPE_TOKEN_ID],
        }))
      );
    }

    if (G.condottiereTokenOwnerId === playerId) {
      moves.push(
        ...freeTerritories.map((t) => ({
          move: 'setTokenOnTerritory',
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

  play(state: State, playerID: PlayerID) {
    const moves = this.enumerate(state.G, state.ctx, playerID);
    const botStates = moves.map((move) => {
      const childState = this.reducer(state, move);
      return generateState(childState, move, playerID);
    });

    return Promise.resolve({
      action: findMaxByAttribute(botStates, 'score')?.move,
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

// TODO Logic depending on state and its type(pope or condottiere token)
function generateScore(childState: State, playerID: string): number {
  return Math.random();
}

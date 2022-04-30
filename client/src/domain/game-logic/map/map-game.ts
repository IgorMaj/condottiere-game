import { GameContext, GameState } from '../../entity';
import { MAP_AI } from '../ai/map';
import { endIf } from '../events/map';
import { GameData } from '../game';
import { setTokenOnTerritory } from '../moves/map';

const nextTurn = (G: GameState, ctx: GameContext) => {
  if (G.popeTokenOwnerId) {
    return Number(G.popeTokenOwnerId);
  }
  if (G.condottiereTokenOwnerId) {
    return Number(G.condottiereTokenOwnerId);
  }
  return 0;
};

export const initMapGame = (state?: GameState) => {
  const MapGame = {
    setup: (ctx: GameContext): GameState => {
      return state ?? GameData;
    },

    ai: MAP_AI,

    endIf: endIf,
    turn: {
      minMoves: 1,
      maxMoves: 2,
      order: {
        first: nextTurn,
        next: nextTurn,
      },
    },

    moves: {
      setTokenOnTerritory: setTokenOnTerritory,
    },
  };
  return MapGame;
};

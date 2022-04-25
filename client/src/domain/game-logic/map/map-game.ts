import { GameContext, GameState } from '../../entity';
import { endIf } from '../events/map';
import { GameData } from '../game';
import { setTokenOnTerritory } from '../moves/map';

export const initMapGame = (state?: GameState) => {
  const MapGame = {
    setup: (ctx: GameContext): GameState => {
      return state ?? GameData;
    },

    endIf: endIf,
    order: {
      first: (G: GameState, ctx: GameContext) =>
        Number(G.condottiereTokenOwnerId),
      next: (G: GameState, ctx: GameContext) => {
        if (G.popeTokenOwnerId) {
          return Number(G.popeTokenOwnerId);
        }
        if (G.condottiereTokenOwnerId) {
          return Number(G.condottiereTokenOwnerId);
        }
        return 0;
      },
    },
    moves: {
      setTokenOnTerritory: setTokenOnTerritory,
    },
  };
  return MapGame;
};

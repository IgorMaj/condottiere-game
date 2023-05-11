import { Game } from "boardgame.io";
import { GameConfig } from "../../../utils/game-config";
import { GameContext, GameState } from "../../entity";
import { MAP_AI } from "../ai/map";
import { endIf } from "../events/map";
import { nextTurn } from "../events/map-common";
import { initGameData } from "../game";
import { setTokenOnTerritory } from "../moves/map";

export const initMapGame = (state?: GameState) => {
  const MapGame: Game = {
    setup: ({ ctx }: { ctx: GameContext }): GameState => {
      return state ?? initGameData(GameConfig.NUM_PLAYERS);
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

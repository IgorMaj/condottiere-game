import { Game } from "boardgame.io";
import { GameConfig } from "../../../utils/game-config";
import { GameContext, GameState } from "../../entity";
import { BATTLE_AI } from "../ai/battle";
import { endIf, first, next } from "../events/battle";
import { initGameData } from "../game";
import { playCard, pass, scarecrow, discardHand } from "../moves/battle";
import { keepCards } from "../moves/keep-cards";
import { firstPlayerWhoStillHasCards } from "../events/keep-cards";

export const initBattleGame = (state?: GameState) => {
  const BattleGame: Game = {
    setup: (ctx: { ctx: GameContext }): GameState => {
      return state ?? initGameData(GameConfig.NUM_PLAYERS);
    },

    ai: BATTLE_AI,

    endIf: endIf,
    phases: {
      default: {
        start: true,
        next: "keepCards",
        turn: {
          minMoves: 1,
          maxMoves: 2,
          order: {
            first: first,
            next: next,
          },
        },

        moves: {
          playCard: playCard,
          pass: pass,
          scarecrow: scarecrow,
          discardHand: discardHand,
        },
      },

      keepCards: {
        next: "default",
        turn: {
          minMoves: 1,
          maxMoves: 1,
          order: {
            first: firstPlayerWhoStillHasCards,
            next: firstPlayerWhoStillHasCards,
          },
        },

        moves: {
          keepCards: keepCards,
        },
      },
    },
  };
  return BattleGame;
};

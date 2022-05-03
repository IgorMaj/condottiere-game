import { GameContext, GameState } from '../../entity';
import { BATTLE_AI } from '../ai/battle';
import { endIf } from '../events/battle';
import { GameData } from '../game';
import { playCard, pass, scarecrow, discardHand } from '../moves/battle';
import { drawCard } from '../moves/draw';
import { allPlayersPassed } from '../utils';

export const initBattleGame = (state?: GameState) => {
  const BattleGame = {
    setup: (ctx: GameContext): GameState => {
      return state ?? GameData;
    },

    ai: BATTLE_AI,

    endIf: endIf,
    turn: {
      minMoves: 1,
      maxMoves: 2,
      order: {
        first: (G: GameState, ctx: GameContext) => 0,
        next: (G: GameState, ctx: GameContext) => {
          if (allPlayersPassed(Object.values(G))) {
            return;
          }
          // we seek to find a player who hasn't passed
          // Loop through next position until we do
          let nextPos = (ctx.playOrderPos + 1) % ctx.numPlayers;
          while (G.players[ctx.playOrder[nextPos]].passed) {
            nextPos = (nextPos + 1) % ctx.numPlayers;
          }
          return nextPos;
        },
      },
    },

    moves: {
      playCard: playCard,
      pass: pass,
      drawCard: drawCard,
      scarecrow: scarecrow,
      discardHand: discardHand,
    },
  };
  return BattleGame;
};

import { GameConfig } from '../../../utils/game-config';
import { GameContext, GameState } from '../../entity';
import { BATTLE_AI } from '../ai/battle';
import { endIf, first, next } from '../events/battle';
import { initGameData } from '../game';
import { playCard, pass, scarecrow, discardHand } from '../moves/battle';
import { drawCard } from '../moves/draw';

export const initBattleGame = (state?: GameState) => {
  const BattleGame = {
    setup: (ctx: GameContext): GameState => {
      return state ?? initGameData(GameConfig.NUM_PLAYERS);
    },

    ai: BATTLE_AI,

    endIf: endIf,
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
      drawCard: drawCard,
      scarecrow: scarecrow,
      discardHand: discardHand,
    },
  };
  return BattleGame;
};

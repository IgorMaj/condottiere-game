import { Game } from 'boardgame.io';
import { GameContext, GameState } from '../../entity';
import {
  endIf,
  first as firstBattle,
  next as nextBattle,
} from '../events/battle';
import { initGameData } from '../game';
import { playCard, pass, scarecrow, discardHand } from '../moves/battle';
import { drawCard } from '../moves/draw';

export const MultiplayerGame: Game = {
  name: 'Condottiere',
  setup: (ctx: GameContext): GameState => {
    return initGameData(ctx.numPlayers);
  },

  endIf: endIf,
  turn: {
    minMoves: 1,
    maxMoves: 2,
    order: {
      first: firstBattle,
      next: nextBattle,
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

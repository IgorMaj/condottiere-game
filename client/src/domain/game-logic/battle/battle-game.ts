import { GameConfig } from '../../../utils/game-config';
import { GameContext, GameState } from '../../entity';
import { BATTLE_AI } from '../ai/battle';
import { endIf } from '../events/battle';
import { initGameData } from '../game';
import { playCard, pass, scarecrow, discardHand } from '../moves/battle';
import { drawCard } from '../moves/draw';
import { allPlayersPassed, getLastCondottiereOwnerPos } from '../utils';

const first = (G: GameState, ctx: GameContext) => {
  if (allPlayersPassed(Object.values(G))) {
    // game should end anyway, so this num doesn't matter
    return 0;
  }
  let firstPos = getLastCondottiereOwnerPos(G);
  // return first player who hasn't passed(start from last condottiere token owner)
  while (G.players[ctx.playOrder[firstPos]].passed) {
    firstPos = (firstPos + 1) % ctx.numPlayers;
  }
  return firstPos;
};

const next = (G: GameState, ctx: GameContext) => {
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
};

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

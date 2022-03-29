import { popMultiple } from '../../utils/methods';
import { createDeck } from '../board/Board';
import {
  ICardModel,
  PlayerState,
  GameContext,
  GameState,
  Players,
} from '../entity';
import { AI } from './ai/battle';
import { pass, playCard } from './moves/battle';
import { drawCard } from './moves/draw';
import { calculateScores } from './score';
import { allPlayersPassed, battleEnded, isDraw } from './utils';

const initPlayer = (id: string, initialHand: ICardModel[]): PlayerState => {
  return {
    hand: initialHand,
    battleLine: [],
    id: id,
    passed: false,
  };
};

export const Game = {
  setup: (ctx: GameContext): GameState => {
    const deck = createDeck();
    const players: Players = {};
    for (let i = 0; i < ctx.numPlayers; i++) {
      players[`${i}`] = initPlayer(`${i}`, popMultiple(deck, 10));
    }
    return {
      deck: deck,
      players: players,
    };
  },

  ai: AI,

  turn: {
    minMoves: 1,
    maxMoves: 1,
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

  endIf: (G: GameState, ctx: GameContext) => {
    const playerStates = Object.values(G.players);
    if (!battleEnded(playerStates)) {
      return;
    }
    const scoreObjs = calculateScores(playerStates);

    if (isDraw(scoreObjs)) {
      return { draw: true };
    }

    const maxScore = scoreObjs
      .map((score) => score.score)
      .reduce((a, b) => Math.max(a, b));

    const winnerId = scoreObjs.find((obj) => obj.score === maxScore)?.playerId;
    return { winner: winnerId };
  },

  moves: {
    playCard: playCard,
    pass: pass,
    drawCard: drawCard,
  },
};

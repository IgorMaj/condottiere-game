import { popMultiple } from '../../utils/methods';
import { createDeck } from '../board/Board';
import {
  ICardModel,
  PlayerState,
  GameContext,
  GameState,
  Players,
} from '../entity';
import { calculateScores } from './score';

const initPlayer = (id: string, initialHand: ICardModel[]): PlayerState => {
  return {
    hand: initialHand,
    battleLine: [],
    id: id,
  };
};

function isDraw(scores: { playerId: string; score: number }[]) {
  return new Set(scores.map((score) => score.score)).size === 1;
}

function handsEmpty(states: PlayerState[]) {
  return states.map((state) => state.hand).flat().length === 0;
}

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

  ai: {
    enumerate: (G: GameState, ctx: GameContext) => {
      const botHand = G.players[ctx.currentPlayer].hand;
      const moves = [];
      for (let i = 0; i < botHand.length; i++) {
        moves.push({ move: 'playCard', args: [botHand[i].id] });
      }
      return moves;
    },
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  endIf: (G: GameState, ctx: GameContext) => {
    const playerStates = Object.values(G.players);
    if (!handsEmpty(playerStates)) {
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
    playCard: (G: GameState, ctx: GameContext, cardId: string) => {
      const playerState = G.players[ctx.currentPlayer];
      // remove the card from hand
      const card = playerState.hand.filter(
        (elem: ICardModel) => elem.id === cardId
      )?.[0];
      if (!card) {
        return;
      }
      playerState.hand = playerState.hand.filter(
        (elem: ICardModel) => elem.id !== card.id
      );

      // add it to battle line
      playerState.battleLine.push(card);
    },
    drawCard: (G: GameState, ctx: GameContext) => {
      const playerState = G.players[ctx.currentPlayer];
      const newCard = G.deck.pop();
      if (newCard) {
        playerState.hand.push(newCard);
      }
    },
  },
};

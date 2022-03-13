import { ICardModel } from '../components/cards/Card';
import { popMultiple } from '../utils/methods';
import { createDeck } from './board/Board';

export interface GameContext {
  turn: number;
  currentPlayer: string;
  numPlayers: number;
}

export interface PlayerState {
  // cards which are in player's "hand"
  hand: ICardModel[];
  // cards which are in the player's battle line i.e on the field
  // already played
  battleLine: ICardModel[];
  id: string;
}

interface Players {
  [key: string]: PlayerState;
}

export interface GameState {
  players: Players;
  deck: ICardModel[];
}

const initPlayer = (id: string, initialHand: ICardModel[]): PlayerState => {
  return {
    hand: initialHand,
    battleLine: [],
    id: id,
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

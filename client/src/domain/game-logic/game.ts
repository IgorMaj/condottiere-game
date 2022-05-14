import { popMultiple } from '../../utils/methods';
import { createDeck } from '../board/Board';
import { ICardModel, PlayerState, GameState, Players } from '../entity';
import { initTerritories } from './map/init-map';

const initPlayer = (id: string, initialHand: ICardModel[]): PlayerState => {
  return {
    hand: initialHand,
    battleLine: [],
    id: id,
    passed: false,
  };
};

export const initGameData = (numPlayers: number): GameState => {
  const deck = createDeck();
  const players: Players = {};
  for (let i = 0; i < numPlayers; i++) {
    players[`${i}`] = initPlayer(`${i}`, popMultiple(deck, 10));
  }
  return {
    deck: deck,
    players: players,
    territories: initTerritories(),
    popeTokenOwnerId: null,
    condottiereTokenOwnerId: '0',
    discardPile: [],
  };
};

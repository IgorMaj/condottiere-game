/**
 * class denotes the exact kind of the card i.e mercenary10 (Knight), or courtesan
 * type denotes broader type, i.e mercenaries
 * id, denotes exact card id, so we can search it in collections etc
 */
export interface ICardModel {
  id: string;
  image: string;
  class: string;
  type: string;
  value: number; // often zero for special cards and powers
}

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

export interface Players {
  [key: string]: PlayerState;
}

export interface GameState {
  players: Players;
  deck: ICardModel[];
}

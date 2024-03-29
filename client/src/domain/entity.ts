import { Ctx } from "boardgame.io";

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

export type GameContext = Ctx;

export interface PlayerState {
  // cards which are in player's "hand"
  hand: ICardModel[];
  // cards which are in the player's battle line i.e on the field
  // already played
  battleLine: ICardModel[];
  id: string;
  passed: boolean;
}

export interface Players {
  [key: string]: PlayerState;
}

export interface GameState {
  players: Players;
  deck: ICardModel[];
  territories: Territory[];
  condottiereTokenOwnerId: string | null;
  popeTokenOwnerId: string | null;
  discardPile: ICardModel[];
  condottiereTokenOwnerHistory: string[];
  /* this is necessary because ctx is not updated right away, so the battle ends without triggering this special phase first */
  keepCardsPhaseActive?: boolean;
}

// because in multiplayer, battle is just a phase, not a full-fledged game like in singleplayer
export interface MultiplayerGameState extends GameState {
  battleEnded?: boolean;
  battleWinner?: string;
}

export interface Territory {
  name: string;
  top: string;
  left: string;
  owner: string | null; // playerId who owns the territory
  status: string; // free, battle, taken, or pope
  adjacentTo: string[]; // territory names(ids) which this one borders
}

export type Moves = Record<string, (...args: any[]) => void>;

export type Events = {
  endTurn?: () => void;
  endPhase?: () => void;
  setPhase?: (phase: string) => void;
};

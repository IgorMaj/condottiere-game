import { SURRENDER_CLASS } from '../../utils/constants';
import { PlayerState } from '../entity';

export function isDraw(scores: { playerId: string; score: number }[]): boolean {
  return new Set(scores.map((score) => score.score)).size === 1;
}

export function handsEmpty(states: PlayerState[]): boolean {
  return states.map((state) => state.hand).flat().length === 0;
}

export function surrenderPlayed(states: PlayerState[]): boolean {
  return states
    .map((state) => state.battleLine)
    .flat()
    .map((card) => card.class)
    .includes(SURRENDER_CLASS);
}

export function battleEnded(states: PlayerState[]): boolean {
  return handsEmpty(states) || surrenderPlayed(states);
}

import {
  MERCENARY_TYPE,
  SCARECROW_CLASS,
  SURRENDER_CLASS,
  TerritoryStatus,
} from '../../utils/constants';
import { ICardModel, PlayerState, Territory } from '../entity';

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

export function allPlayersPassed(states: PlayerState[]): boolean {
  return states.filter((state) => !state.passed).length === 0;
}

export function battleEnded(states: PlayerState[]): boolean {
  return (
    handsEmpty(states) || surrenderPlayed(states) || allPlayersPassed(states)
  );
}

// Note: This method finds the strongest card by type and base value, to avoid
// recursion errors that could be introduced with calculateCardValue method
// Since the battle line strength effects only matter at the end of the battle
// i.e score is just preview so the players can see what it would look like
// The rules seem to make this okay, because all effects are calculated at the battle end
// i.e winter, spring, drummer,with the exception being bishop which does its effect immediately
export function findStrongestMercenaryCard(
  states: PlayerState[]
): ICardModel | null {
  const allMercenaryCards = states
    .map((state) => state.battleLine)
    .flat()
    .filter((card) => card.type === MERCENARY_TYPE);
  if (!allMercenaryCards?.length) {
    return null;
  }
  let maxCard = allMercenaryCards[0];
  for (let i = 1; i < allMercenaryCards.length; i++) {
    if (maxCard.value <= allMercenaryCards[i].value) {
      maxCard = allMercenaryCards[i];
    }
  }
  return maxCard;
}

// if there is scarecrow in the battleline, it has just been played
export function scarecrowPlayed(state: PlayerState): boolean {
  return (
    state.battleLine.filter((card) => card.class === SCARECROW_CLASS).length > 0
  );
}

export function getScarecrow(state: PlayerState): ICardModel {
  return state.battleLine.filter((card) => card.class === SCARECROW_CLASS)[0];
}

export function getCurrentBattleTerritory(territories: Territory[]): Territory {
  return territories.filter(
    (territory: Territory) => territory.status === TerritoryStatus.BATTLE
  )[0];
}

export function getCurrentPopeTerritory(territories: Territory[]): Territory {
  return territories.filter(
    (territory: Territory) => territory.status === TerritoryStatus.POPE
  )[0];
}

export function getPlayerTerritoryCount(
  territories: Territory[],
  playedId: string
): number {
  return territories.filter((t) => t.owner === playedId).length;
}

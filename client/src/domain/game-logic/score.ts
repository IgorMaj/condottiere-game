import {
  DRUMMER_CLASS,
  MERCENARY_TYPE,
  SPRING_CLASS,
  WINTER_CLASS,
} from '../../utils/constants';
import { ICardModel, PlayerState } from '../entity';
import { findStrongestMercenaryCard } from './utils';

export const calculateScores = (
  states: PlayerState[]
): { playerId: string; score: number }[] => {
  const retVal: { playerId: string; score: number }[] = [];
  for (let state of states) {
    retVal.push({
      playerId: state.id,
      score: state.battleLine
        .map((card: ICardModel) => calculateCardValue(states, card))
        .reduce((partialSum, a) => partialSum + a, 0),
    });
  }

  return retVal;
};

// Calculates whole card value with all the possible effects
function calculateCardValue(states: PlayerState[], card: ICardModel): number {
  if (card.type !== MERCENARY_TYPE) {
    return card.value;
  }
  const drummerEffect = calculateDrummerEffect(states, card);
  const allCards = states.map((state) => state.battleLine).flat();

  const isWinter = !!allCards.filter((card) => card.class === WINTER_CLASS)
    .length;
  if (isWinter && card.type === MERCENARY_TYPE) {
    return 1 * drummerEffect;
  }

  const isSpring = !!allCards.filter((card) => card.class === SPRING_CLASS)
    .length;
  const strongestMercenary = findStrongestMercenaryCard(states);
  if (isSpring && card.value === strongestMercenary?.value) {
    return card.value * drummerEffect + 3;
  }

  return card.value * drummerEffect;
}

// if there is drummer in the battle line double the card score at the end of the battle
function calculateDrummerEffect(
  states: PlayerState[],
  card: ICardModel
): number {
  const battleLines = states.map((state) => state.battleLine);
  for (let i = 0; i < battleLines.length; i++) {
    const isCardBattleLine = !!battleLines[i].filter(
      (elem) => card.id === elem.id
    ).length;
    const containsDrummer = !!battleLines[i].filter(
      (elem) => elem.class === DRUMMER_CLASS
    ).length;
    if (isCardBattleLine && containsDrummer) {
      // drummer effect
      return 2;
    }
  }
  // no drummer effect
  return 1;
}

import { ICardModel } from '../../components/cards/Card';
import { fisherYatesShuffle } from '../../utils/methods';
import { createMercenary1 } from '../cards/mercenaries/Mercenary1';
import { createMercenary10 } from '../cards/mercenaries/Mercenary10';
import { createMercenary2 } from '../cards/mercenaries/Mercenary2';
import { createMercenary3 } from '../cards/mercenaries/Mercenary3';
import { createMercenary4 } from '../cards/mercenaries/Mercenary4';
import { createMercenary5 } from '../cards/mercenaries/Mercenary5';
import { createMercenary6 } from '../cards/mercenaries/Mercenary6';
import { createScarecrow } from '../cards/powers/Scarecrow';
import { createSpring } from '../cards/powers/Spring';
import { createSurrender } from '../cards/powers/Surrender';
import { createWinter } from '../cards/powers/Winter';
import { createBishop } from '../cards/special/Bishop';
import { createCourtesan } from '../cards/special/Courtesan';
import { createDrummer } from '../cards/special/Drummer';
import { createHeroine } from '../cards/special/Heroine';
import { PlayerState } from '../Game';

export const calculateScores = (
  states: PlayerState[]
): { playerId: string; score: number }[] => {
  const retVal: { playerId: string; score: number }[] = [];
  for (let state of states) {
    retVal.push({
      playerId: state.id,
      score: state.battleLine
        .map((card: ICardModel) => card.value)
        .reduce((partialSum, a) => partialSum + a, 0),
    });
  }

  return retVal;
};

export const createMultipleCards = (
  createFn: () => ICardModel,
  times: number
): ICardModel[] => {
  const retVal: ICardModel[] = [];
  for (let i = 0; i < times; i++) {
    retVal.push(createFn());
  }
  return retVal;
};

export const createDeck = (): ICardModel[] => {
  const deck = [
    ...createMultipleCards(createMercenary1, 10),
    ...createMultipleCards(createMercenary2, 8),
    ...createMultipleCards(createMercenary3, 8),
    ...createMultipleCards(createMercenary4, 8),
    ...createMultipleCards(createMercenary5, 8),
    ...createMultipleCards(createMercenary6, 8),
    ...createMultipleCards(createMercenary10, 8),
    ...createMultipleCards(createBishop, 6),
    ...createMultipleCards(createCourtesan, 12),
    ...createMultipleCards(createDrummer, 6),
    ...createMultipleCards(createHeroine, 3),
    ...createMultipleCards(createScarecrow, 16),
    ...createMultipleCards(createSpring, 3),
    ...createMultipleCards(createSurrender, 3),
    ...createMultipleCards(createWinter, 3),
  ];
  fisherYatesShuffle(deck);
  return deck;
};

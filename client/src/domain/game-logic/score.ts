import { ICardModel, PlayerState } from '../entity';

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

export function calculateCardValue(
  states: PlayerState[],
  card: ICardModel
): number {
  return card.value;
}

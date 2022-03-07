import IMG from '../../../assets/cards/powers/winter.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { POWER_TYPE, WINTER_ID } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createWinter = (): ICardModel => {
  return {
    image: IMG,
    class: WINTER_ID,
    type: POWER_TYPE,
    id: generateId(),
  };
};

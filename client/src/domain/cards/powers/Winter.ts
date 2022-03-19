import IMG from '../../../assets/cards/powers/winter.jpg';
import { POWER_TYPE, WINTER_ID } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createWinter = (): ICardModel => {
  return {
    image: IMG,
    class: WINTER_ID,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

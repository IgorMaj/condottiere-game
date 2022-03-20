import IMG from '../../../assets/cards/powers/winter.jpg';
import { POWER_TYPE, WINTER_CLASS } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createWinter = (): ICardModel => {
  return {
    image: IMG,
    class: WINTER_CLASS,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

import HEROINE_IMG from '../../../assets/cards/special/heroine.jpg';
import { HEROINE_ID, SPECIAL_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createHeroine = (): ICardModel => {
  return {
    image: HEROINE_IMG,
    class: HEROINE_ID,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 10,
  };
};

import COURTESAN_IMG from '../../../assets/cards/special/courtesan.jpg';
import { COURTESAN_CLASS, SPECIAL_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createCourtesan = (): ICardModel => {
  return {
    image: COURTESAN_IMG,
    class: COURTESAN_CLASS,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 1,
  };
};

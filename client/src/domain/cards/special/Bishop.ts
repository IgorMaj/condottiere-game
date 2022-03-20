import BISHOP_IMG from '../../../assets/cards/special/bishop.jpg';
import { BISHOP_CLASS, SPECIAL_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createBishop = (): ICardModel => {
  return {
    image: BISHOP_IMG,
    class: BISHOP_CLASS,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 0,
  };
};

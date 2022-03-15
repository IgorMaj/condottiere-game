import BISHOP_IMG from '../../../assets/cards/special/bishop.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { BISHOP_ID, SPECIAL_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createBishop = (): ICardModel => {
  return {
    image: BISHOP_IMG,
    class: BISHOP_ID,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 0,
  };
};

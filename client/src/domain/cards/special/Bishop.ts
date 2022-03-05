import BISHOP_IMG from '../../../assets/cards/special/bishop.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { BISHOP_ID, SPECIAL_TYPE } from '../../../utils/constants';

export const createBishop = (): ICardModel => {
  return {
    image: BISHOP_IMG,
    id: BISHOP_ID,
    type: SPECIAL_TYPE,
  };
};

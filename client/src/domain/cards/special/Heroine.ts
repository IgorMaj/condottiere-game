import HEROINE_IMG from '../../../assets/cards/special/heroine.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { HEROINE_ID, SPECIAL_TYPE } from '../../../utils/constants';

export const createHeroine = (): ICardModel => {
  return {
    image: HEROINE_IMG,
    id: HEROINE_ID,
    type: SPECIAL_TYPE,
  };
};

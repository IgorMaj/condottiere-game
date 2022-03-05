import COURTESAN_IMG from '../../../assets/cards/special/courtesan.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { COURTESAN_ID, SPECIAL_TYPE } from '../../../utils/constants';

export const createCourtesan = (): ICardModel => {
  return {
    image: COURTESAN_IMG,
    id: COURTESAN_ID,
    type: SPECIAL_TYPE,
  };
};

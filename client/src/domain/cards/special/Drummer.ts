import DRUMMER_IMG from '../../../assets/cards/special/drummer.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { DRUMMER_ID, SPECIAL_TYPE } from '../../../utils/constants';

export const createDrummer = (): ICardModel => {
  return {
    image: DRUMMER_IMG,
    id: DRUMMER_ID,
    type: SPECIAL_TYPE,
  };
};

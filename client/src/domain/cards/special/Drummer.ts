import DRUMMER_IMG from '../../../assets/cards/special/drummer.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { DRUMMER_ID, SPECIAL_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createDrummer = (): ICardModel => {
  return {
    image: DRUMMER_IMG,
    class: DRUMMER_ID,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 0,
  };
};

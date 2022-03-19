import DRUMMER_IMG from '../../../assets/cards/special/drummer.jpg';
import { DRUMMER_ID, SPECIAL_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createDrummer = (): ICardModel => {
  return {
    image: DRUMMER_IMG,
    class: DRUMMER_ID,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 0,
  };
};

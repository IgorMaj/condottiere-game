import MERCENARY_IMG from '../../../assets/cards/mercenaries/1.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_1_ID, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createMercenary1 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_1_ID,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 1,
  };
};

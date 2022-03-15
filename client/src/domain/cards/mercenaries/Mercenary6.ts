import MERCENARY_IMG from '../../../assets/cards/mercenaries/6.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_6_ID, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createMercenary6 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_6_ID,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 6,
  };
};

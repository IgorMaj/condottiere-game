import MERCENARY_IMG from '../../../assets/cards/mercenaries/10.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_10_ID, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createMercenary10 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_10_ID,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 10,
  };
};

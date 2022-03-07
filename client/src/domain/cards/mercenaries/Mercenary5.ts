import MERCENARY_IMG from '../../../assets/cards/mercenaries/5.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_5_ID, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createMercenary5 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_5_ID,
    type: MERCENARY_TYPE,
    id: generateId(),
  };
};

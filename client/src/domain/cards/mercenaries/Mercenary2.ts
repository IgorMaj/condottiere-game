import MERCENARY_IMG from '../../../assets/cards/mercenaries/2.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_2_ID, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createMercenary2 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_2_ID,
    type: MERCENARY_TYPE,
    id: generateId(),
  };
};

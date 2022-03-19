import MERCENARY_IMG from '../../../assets/cards/mercenaries/3.jpg';
import { MERCENARY_3_ID, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createMercenary3 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_3_ID,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 3,
  };
};

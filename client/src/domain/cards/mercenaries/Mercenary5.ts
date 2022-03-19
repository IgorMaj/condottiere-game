import MERCENARY_IMG from '../../../assets/cards/mercenaries/5.jpg';
import { MERCENARY_5_ID, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createMercenary5 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_5_ID,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 5,
  };
};

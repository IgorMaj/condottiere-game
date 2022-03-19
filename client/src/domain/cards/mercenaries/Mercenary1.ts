import MERCENARY_IMG from '../../../assets/cards/mercenaries/1.jpg';
import { MERCENARY_1_ID, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createMercenary1 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_1_ID,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 1,
  };
};

import MERCENARY_IMG from '../../../assets/cards/mercenaries/4.jpg';
import { MERCENARY_4_CLASS, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createMercenary4 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_4_CLASS,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 4,
  };
};

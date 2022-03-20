import MERCENARY_IMG from '../../../assets/cards/mercenaries/6.jpg';
import { MERCENARY_6_CLASS, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createMercenary6 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    class: MERCENARY_6_CLASS,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 6,
  };
};

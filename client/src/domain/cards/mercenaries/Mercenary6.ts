import { MERCENARY_6_CLASS, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createMercenary6 = (): ICardModel => {
  return {
    image: 'mercenaries/6.jpg',
    class: MERCENARY_6_CLASS,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 6,
  };
};

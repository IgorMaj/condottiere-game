import { MERCENARY_1_CLASS, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createMercenary1 = (): ICardModel => {
  return {
    image: 'mercenaries/1.jpg',
    class: MERCENARY_1_CLASS,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 1,
  };
};

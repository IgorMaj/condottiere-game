import { MERCENARY_5_CLASS, MERCENARY_TYPE } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createMercenary5 = (): ICardModel => {
  return {
    image: 'mercenaries/5.jpg',
    class: MERCENARY_5_CLASS,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 5,
  };
};

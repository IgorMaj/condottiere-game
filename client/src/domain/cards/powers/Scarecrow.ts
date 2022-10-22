import { POWER_TYPE, SCARECROW_CLASS } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createScarecrow = (): ICardModel => {
  return {
    image: 'powers/scarecrow.jpg',
    class: SCARECROW_CLASS,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

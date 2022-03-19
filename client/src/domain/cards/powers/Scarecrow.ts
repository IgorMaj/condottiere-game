import IMG from '../../../assets/cards/powers/scarecrow.jpg';
import { POWER_TYPE, SCARECROW_ID } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createScarecrow = (): ICardModel => {
  return {
    image: IMG,
    class: SCARECROW_ID,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

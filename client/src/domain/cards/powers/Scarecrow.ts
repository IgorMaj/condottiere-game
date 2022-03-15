import IMG from '../../../assets/cards/powers/scarecrow.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { POWER_TYPE, SCARECROW_ID } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createScarecrow = (): ICardModel => {
  return {
    image: IMG,
    class: SCARECROW_ID,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

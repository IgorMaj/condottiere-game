import IMG from '../../../assets/cards/powers/scarecrow.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { POWER_TYPE, SCARECROW_ID } from '../../../utils/constants';

export const createScarecrow = (): ICardModel => {
  return {
    image: IMG,
    id: SCARECROW_ID,
    type: POWER_TYPE,
  };
};

import IMG from '../../../assets/cards/powers/winter.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { POWER_TYPE, WINTER_ID } from '../../../utils/constants';

export const createWinter = (): ICardModel => {
  return {
    image: IMG,
    id: WINTER_ID,
    type: POWER_TYPE,
  };
};

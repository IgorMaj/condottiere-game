import IMG from '../../../assets/cards/powers/surrender.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { POWER_TYPE, SURRENDER_ID } from '../../../utils/constants';

export const createSurrender = (): ICardModel => {
  return {
    image: IMG,
    id: SURRENDER_ID,
    type: POWER_TYPE,
  };
};

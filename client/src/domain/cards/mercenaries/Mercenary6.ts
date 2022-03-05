import MERCENARY_IMG from '../../../assets/cards/mercenaries/6.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_6_ID, MERCENARY_TYPE } from '../../../utils/constants';

export const createMercenary6 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    id: MERCENARY_6_ID,
    type: MERCENARY_TYPE,
  };
};

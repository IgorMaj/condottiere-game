import MERCENARY_IMG from '../../../assets/cards/mercenaries/2.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_2_ID, MERCENARY_TYPE } from '../../../utils/constants';

export const createMercenary2 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    id: MERCENARY_2_ID,
    type: MERCENARY_TYPE,
  };
};

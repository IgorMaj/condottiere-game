import MERCENARY_IMG from '../../../assets/cards/mercenaries/4.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_4_ID, MERCENARY_TYPE } from '../../../utils/constants';

export const createMercenary4 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    id: MERCENARY_4_ID,
    type: MERCENARY_TYPE,
  };
};

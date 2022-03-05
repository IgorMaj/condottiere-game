import MERCENARY_IMG from '../../../assets/cards/mercenaries/3.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_3_ID, MERCENARY_TYPE } from '../../../utils/constants';

export const createMercenary3 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    id: MERCENARY_3_ID,
    type: MERCENARY_TYPE,
  };
};

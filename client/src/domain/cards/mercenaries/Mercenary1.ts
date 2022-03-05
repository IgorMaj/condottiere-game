import MERCENARY_IMG from '../../../assets/cards/mercenaries/1.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { MERCENARY_1_ID, MERCENARY_TYPE } from '../../../utils/constants';

export const createMercenary1 = (): ICardModel => {
  return {
    image: MERCENARY_IMG,
    id: MERCENARY_1_ID,
    type: MERCENARY_TYPE,
  };
};

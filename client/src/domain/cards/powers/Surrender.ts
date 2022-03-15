import IMG from '../../../assets/cards/powers/surrender.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { POWER_TYPE, SURRENDER_ID } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createSurrender = (): ICardModel => {
  return {
    image: IMG,
    class: SURRENDER_ID,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

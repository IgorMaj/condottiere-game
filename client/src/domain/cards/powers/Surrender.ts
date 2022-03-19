import IMG from '../../../assets/cards/powers/surrender.jpg';
import { POWER_TYPE, SURRENDER_ID } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createSurrender = (): ICardModel => {
  return {
    image: IMG,
    class: SURRENDER_ID,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

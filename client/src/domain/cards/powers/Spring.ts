import IMG from '../../../assets/cards/powers/spring.jpg';
import { POWER_TYPE, SPRING_ID } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';
import { ICardModel } from '../../entity';

export const createSpring = (): ICardModel => {
  return {
    image: IMG,
    class: SPRING_ID,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

import IMG from '../../../assets/cards/powers/spring.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { POWER_TYPE, SPRING_ID } from '../../../utils/constants';
import { generateId } from '../../../utils/methods';

export const createSpring = (): ICardModel => {
  return {
    image: IMG,
    class: SPRING_ID,
    type: POWER_TYPE,
    id: generateId(),
  };
};

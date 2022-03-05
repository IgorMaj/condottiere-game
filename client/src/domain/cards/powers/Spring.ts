import IMG from '../../../assets/cards/powers/spring.jpg';
import { ICardModel } from '../../../components/cards/Card';
import { POWER_TYPE, SPRING_ID } from '../../../utils/constants';

export const createSpring = (): ICardModel => {
  return {
    image: IMG,
    id: SPRING_ID,
    type: POWER_TYPE,
  };
};

import { POWER_TYPE, SPRING_CLASS } from "../../../utils/constants";
import { generateId } from "../../../utils/methods";
import { ICardModel } from "../../entity";

export const createSpring = (): ICardModel => {
  return {
    image: "powers/spring.jpg",
    class: SPRING_CLASS,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

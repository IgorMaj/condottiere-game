import { POWER_TYPE, SURRENDER_CLASS } from "../../../utils/constants";
import { generateId } from "../../../utils/methods";
import { ICardModel } from "../../entity";

export const createSurrender = (): ICardModel => {
  return {
    image: "powers/surrender.jpg",
    class: SURRENDER_CLASS,
    type: POWER_TYPE,
    id: generateId(),
    value: 0,
  };
};

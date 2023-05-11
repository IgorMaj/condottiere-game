import { HEROINE_CLASS, SPECIAL_TYPE } from "../../../utils/constants";
import { generateId } from "../../../utils/methods";
import { ICardModel } from "../../entity";

export const createHeroine = (): ICardModel => {
  return {
    image: "special/heroine.jpg",
    class: HEROINE_CLASS,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 10,
  };
};

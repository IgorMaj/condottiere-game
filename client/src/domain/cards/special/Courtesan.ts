import { COURTESAN_CLASS, SPECIAL_TYPE } from "../../../utils/constants";
import { generateId } from "../../../utils/methods";
import { ICardModel } from "../../entity";

export const createCourtesan = (): ICardModel => {
  return {
    image: "special/courtesan.jpg",
    class: COURTESAN_CLASS,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 1,
  };
};

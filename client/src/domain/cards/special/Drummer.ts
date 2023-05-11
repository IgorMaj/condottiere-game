import { DRUMMER_CLASS, SPECIAL_TYPE } from "../../../utils/constants";
import { generateId } from "../../../utils/methods";
import { ICardModel } from "../../entity";

export const createDrummer = (): ICardModel => {
  return {
    image: "special/drummer.jpg",
    class: DRUMMER_CLASS,
    type: SPECIAL_TYPE,
    id: generateId(),
    value: 0,
  };
};

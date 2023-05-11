import { MERCENARY_3_CLASS, MERCENARY_TYPE } from "../../../utils/constants";
import { generateId } from "../../../utils/methods";
import { ICardModel } from "../../entity";

export const createMercenary3 = (): ICardModel => {
  return {
    image: "mercenaries/3.jpg",
    class: MERCENARY_3_CLASS,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 3,
  };
};

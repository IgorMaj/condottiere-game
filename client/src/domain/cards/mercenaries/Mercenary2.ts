import { MERCENARY_2_CLASS, MERCENARY_TYPE } from "../../../utils/constants";
import { generateId } from "../../../utils/methods";
import { ICardModel } from "../../entity";

export const createMercenary2 = (): ICardModel => {
  return {
    image: "mercenaries/2.jpg",
    class: MERCENARY_2_CLASS,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 2,
  };
};

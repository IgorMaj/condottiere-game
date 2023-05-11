import { MERCENARY_10_CLASS, MERCENARY_TYPE } from "../../../utils/constants";
import { generateId } from "../../../utils/methods";
import { ICardModel } from "../../entity";

export const createMercenary10 = (): ICardModel => {
  return {
    image: "mercenaries/10.jpg",
    class: MERCENARY_10_CLASS,
    type: MERCENARY_TYPE,
    id: generateId(),
    value: 10,
  };
};

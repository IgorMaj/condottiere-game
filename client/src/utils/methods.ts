import { v4 as uuidv4 } from "uuid";
import { GameState } from "../domain/entity";

// like pop, only picks an element randomly
export const randomPop = (arr: any[]) => {
  return arr.splice(Math.floor(Math.random() * arr.length), 1)?.[0];
};

// in-place shuffle (no new array is created)
export function fisherYatesShuffle(arr: any[]) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
}

export function popMultiple(arr: any[], count: number) {
  const retVal: any[] = [];
  for (var i = 0; i < count; i++) {
    const elem = randomPop(arr);
    if (elem) {
      retVal.push(elem);
    } else {
      break;
    }
  }
  return retVal;
}

export const generateId = (): string => {
  return `o_${uuidv4().replaceAll("-", "_")}`;
};

export function validGameState(g: any) {
  return !!g?.deck;
}

export function resolveG(G: GameState): GameState {
  return JSON.parse(JSON.stringify(G));
}

export function findMaxByAttribute<T>(data: T[], attr: string): T | null {
  try {
    const max: T = data.reduce((prev, current) =>
      (prev as any)[attr] > (current as any)[attr] ? prev : current
    );
    return max;
  } catch (err) {
    return null;
  }
}

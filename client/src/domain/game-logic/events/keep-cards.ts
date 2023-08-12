import { GameState } from "../../entity";

/**
 *
 * @param G
 * @returns id of player who still has cards left
 */
export const firstPlayerWhoStillHasCards = ({ G }: { G: GameState }) => {
  return Number(Object.values(G.players).find((p) => !!p.hand.length)?.id ?? 0);
};

/**
 *
 * @param G
 * @returns boolean indicating whether a player has any cards left
 */
export const onlyOnePlayerHasCards = (G: GameState) => {
  return Object.values(G.players).filter((p) => !!p.hand.length).length === 1;
};

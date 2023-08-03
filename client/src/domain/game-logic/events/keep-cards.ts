import { GameState, GameContext } from "../../entity";

/**
 *
 * @param G and ctx
 * @returns id of player who still has cards left
 */
export const firstPlayerWhoStillHasCards = ({
  G,
  ctx,
}: {
  G: GameState;
  ctx: GameContext;
}) => {
  return Number(Object.values(G.players).find((p) => !!p.hand.length)?.id ?? 0);
};

export const onlyOnePlayerHasCards = ({
  G,
  ctx,
}: {
  G: GameState;
  ctx: GameContext;
}) => {
  return Object.values(G.players).filter((p) => !!p.hand.length).length === 1;
};

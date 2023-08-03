import { GameContext, GameState } from "../../entity";

/**
 *
 * Last player to still have cards can elect to keep up to two of them
 */
export const keepCards = (
  {
    G,
    ctx,
    events,
  }: {
    G: GameState;
    ctx: GameContext;
    events: { endTurn: () => void; endPhase: () => void };
  },
  cardIds: string[]
) => {
  if (cardIds.length > 2) {
    throw Error("Illegal move");
  }
  const playerState = G.players[ctx.currentPlayer];

  // we discard cards which are not in the id list
  const cardsToDiscard = playerState.hand.filter(
    (c) => !cardIds.includes(c.id)
  );

  // we keep the ones player told us to
  playerState.hand = playerState.hand.filter((c) => cardIds.includes(c.id));
  // then the player should pass as well
  playerState.passed = true;

  G.discardPile.push(...cardsToDiscard);
  events?.endTurn();
  events?.endPhase();
};

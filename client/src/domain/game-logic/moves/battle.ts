import { GameContext, GameState, ICardModel } from '../../entity';

export const playCard = (G: GameState, ctx: GameContext, cardId: string) => {
  const playerState = G.players[ctx.currentPlayer];
  // remove the card from hand
  const card = playerState.hand.filter(
    (elem: ICardModel) => elem.id === cardId
  )?.[0];
  if (!card) {
    return;
  }
  playerState.hand = playerState.hand.filter(
    (elem: ICardModel) => elem.id !== card.id
  );

  // add it to battle line
  playerState.battleLine.push(card);
};

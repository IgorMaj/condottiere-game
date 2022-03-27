import { GameState, GameContext } from '../../entity';

export const drawCard = (G: GameState, ctx: GameContext) => {
  const playerState = G.players[ctx.currentPlayer];
  const newCard = G.deck.pop();
  if (newCard) {
    playerState.hand.push(newCard);
  }
};

import { GameContext, GameState } from '../../entity';

export const AI = {
  enumerate: (G: GameState, ctx: GameContext) => {
    const botHand = G.players[ctx.currentPlayer].hand;
    const moves = [];
    for (let i = 0; i < botHand.length; i++) {
      moves.push({ move: 'playCard', args: [botHand[i].id] });
    }
    return moves;
  },
};

import { MERCENARY_TYPE } from '../../../utils/constants';
import { GameContext, GameState, PlayerState } from '../../entity';
import { getScarecrow, scarecrowPlayed } from '../utils';

export const AI = {
  enumerate: (G: GameState, ctx: GameContext) => {
    const botHand = G.players[ctx.currentPlayer].hand;
    const moves: any = [];

    if (G.players[ctx.currentPlayer].passed) {
      return moves;
    }

    // if scarecrow is played only the 'scarecrow' move is available
    if (scarecrowPlayed(G.players[ctx.currentPlayer])) {
      generateScarecrowMoves(G.players[ctx.currentPlayer], moves);
    } else {
      for (let i = 0; i < botHand.length; i++) {
        moves.push({ move: 'playCard', args: [botHand[i].id] });
      }
      moves.push({ move: 'pass' });
    }
    return moves;
  },
};

function generateScarecrowMoves(state: PlayerState, moves: any[]) {
  const botBattleLine = state.battleLine;
  const scarecrow = getScarecrow(state);
  moves.push({ move: 'scarecrow', args: [scarecrow.id] });
  botBattleLine
    .filter((card) => card.type === MERCENARY_TYPE)
    .forEach((mercenary) => {
      moves.push({ move: 'scarecrow', args: [scarecrow.id, mercenary.id] });
    });
}

import {
  CONDOTTIERE_TOKEN_ID,
  POPE_TOKEN_ID,
  TerritoryStatus,
} from '../../../utils/constants';
import { GameContext, GameState } from '../../entity';

export const MAP_AI = {
  enumerate: (G: GameState, ctx: GameContext) => {
    const moves: any = [];
    const playerId = G.players[ctx.currentPlayer].id;
    const freeTerritories = G.territories.filter(
      (t) => t.status === TerritoryStatus.FREE
    );

    if (G.popeTokenOwnerId === playerId) {
      moves.push(
        ...freeTerritories.map((t) => ({
          move: 'setTokenOnTerritory',
          args: [t.name, POPE_TOKEN_ID],
        }))
      );
    }

    if (G.condottiereTokenOwnerId === playerId) {
      moves.push(
        ...freeTerritories.map((t) => ({
          move: 'setTokenOnTerritory',
          args: [t.name, CONDOTTIERE_TOKEN_ID],
        }))
      );
    }

    return moves;
  },
};

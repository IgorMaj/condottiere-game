import {
  CONDOTTIERE_TOKEN_ID,
  POPE_TOKEN_ID,
  TerritoryStatus,
} from '../../../utils/constants';
import { GameContext, GameState, Territory } from '../../entity';

export const setTokenOnTerritory = (
  G: GameState,
  ctx: GameContext,
  territoryName: string,
  tokenId: string
) => {
  G.territories = G.territories.map((t) =>
    calculateTerritoryStatus(t, territoryName, tokenId)
  );
  if (tokenId === POPE_TOKEN_ID) {
    G.popeTokenOwnerId = null;
    // if the current owner doesn't own a condottiere token as well
    // as the pope one, end his turn
    if (G.condottiereTokenOwnerId !== G.players[ctx.currentPlayer].id) {
      ctx?.events?.endTurn();
    }
  }
  if (tokenId === CONDOTTIERE_TOKEN_ID) {
    G.condottiereTokenOwnerId = null;
  }
};

function calculateTerritoryStatus(
  t: Territory,
  territoryName: string,
  tokenId: string
): Territory {
  if (t.name === territoryName) {
    if (tokenId === CONDOTTIERE_TOKEN_ID) {
      t.status = TerritoryStatus.BATTLE;
    } else if (tokenId === POPE_TOKEN_ID) {
      t.status = TerritoryStatus.POPE;
    }
  }

  return t;
}

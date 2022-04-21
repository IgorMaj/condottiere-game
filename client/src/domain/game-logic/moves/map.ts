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
  }
  if (tokenId === CONDOTTIERE_TOKEN_ID) {
    G.condottiereTokenOwnerId = null;
    // TODO end turn and phase, start next phase
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

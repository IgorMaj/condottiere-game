import { showAlert } from '../../../components/alert/alert.service';
import {
  CONDOTTIERE_TOKEN_ID,
  POPE_TOKEN_ID,
  TerritoryStatus,
} from '../../../utils/constants';
import { toBattle } from '../../../utils/navigation';
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
    ctx?.events?.endTurn();
  }
  if (tokenId === CONDOTTIERE_TOKEN_ID) {
    G.condottiereTokenOwnerId = null;
    showAlert('Territory marked. The battle will start soon.');
    toBattle(G);
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

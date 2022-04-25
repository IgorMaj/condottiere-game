import { PLAYER_WIN_TERRITORY_COUNT } from '../../../utils/constants';
import { GameContext, GameState } from '../../entity';
import { calculateTotalTerritoryCounts } from '../score';

export const endIf = (G: GameState, ctx: GameContext) => {
  // TODO adjacent territory logic logic
  return totalTerritoryCondition(G);
};

const totalTerritoryCondition = (G: GameState) => {
  const totalTerritoryCounts = calculateTotalTerritoryCounts(G);
  const maxScore = totalTerritoryCounts
    .map((score) => score.score)
    .reduce((a, b) => Math.max(a, b));

  if (maxScore >= PLAYER_WIN_TERRITORY_COUNT) {
    const winnerId = totalTerritoryCounts.find(
      (obj) => obj.score === maxScore
    )?.playerId;
    return { winner: winnerId };
  }
};

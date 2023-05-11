import { GameConfig } from "../../../utils/game-config";
import { GameContext, GameState } from "../../entity";
import {
  calculateAdjacentTerritoryCounts,
  calculateTotalTerritoryCounts,
} from "../score";

export const endIf = ({ G, ctx }: { G: GameState; ctx: GameContext }) => {
  const adjacentWinner = adjacentTerritoryCondition(G);
  return adjacentWinner ? adjacentWinner : totalTerritoryCondition(G);
};

const adjacentTerritoryCondition = (G: GameState) => {
  const adjacentTerritoryCounts = calculateAdjacentTerritoryCounts(G);
  const maxScore = adjacentTerritoryCounts
    .map((score) => score.score)
    .reduce((a, b) => Math.max(a, b));

  if (maxScore >= GameConfig.PLAYER_ADJACENT_WIN_TERRITORY_COUNT) {
    const winnerId = adjacentTerritoryCounts.find(
      (obj) => obj.score === maxScore
    )?.playerId;
    return { winner: winnerId };
  }
};

const totalTerritoryCondition = (G: GameState) => {
  const totalTerritoryCounts = calculateTotalTerritoryCounts(G);
  const maxScore = totalTerritoryCounts
    .map((score) => score.score)
    .reduce((a, b) => Math.max(a, b));

  if (maxScore >= GameConfig.PLAYER_WIN_TERRITORY_COUNT) {
    const winnerId = totalTerritoryCounts.find(
      (obj) => obj.score === maxScore
    )?.playerId;
    return { winner: winnerId };
  }
};

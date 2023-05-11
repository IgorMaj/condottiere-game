import { GameContext, GameState } from "../../entity";

export const nextTurn = ({ G, ctx }: { G: GameState; ctx: GameContext }) => {
  if (G.popeTokenOwnerId) {
    return Number(G.popeTokenOwnerId);
  }
  if (G.condottiereTokenOwnerId) {
    return Number(G.condottiereTokenOwnerId);
  }
  return 0;
};

export const mapPhaseHasEnded = ({
  G,
  ctx,
}: {
  G: GameState;
  ctx: GameContext;
}) => {
  return !G.condottiereTokenOwnerId;
};

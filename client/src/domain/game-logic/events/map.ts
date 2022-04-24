import { GameContext, GameState } from '../../entity';

export const endIf = (G: GameState, ctx: GameContext) =>
  !G.condottiereTokenOwnerId;

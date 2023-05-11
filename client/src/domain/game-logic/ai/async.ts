import { Game, Ctx, PlayerID } from "boardgame.io";
import { MCTSBot } from "boardgame.io/ai";

export class AsyncBot extends MCTSBot {
  constructor({
    enumerate,
    seed,
    objectives,
    game,
    iterations,
    playoutDepth,
    iterationCallback,
  }: {
    enumerate: any;
    seed?: string | number;
    game: Game;
    objectives?: (G: any, ctx: Ctx, playerID?: PlayerID) => any;
    iterations?: number | ((G: any, ctx: Ctx, playerID?: PlayerID) => number);
    playoutDepth?: number | ((G: any, ctx: Ctx, playerID?: PlayerID) => number);
    iterationCallback?: any;
  }) {
    super({
      enumerate,
      seed,
      objectives,
      game,
      iterations,
      playoutDepth,
      iterationCallback,
    });
    this.setOpt("async", true);
  }
}

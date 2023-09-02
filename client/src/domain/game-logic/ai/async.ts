import { Game, Ctx, PlayerID, State } from "boardgame.io";
import { MCTSBot } from "boardgame.io/ai";
import { GameState } from "../../entity";
import { sleep } from "../utils";
import { AI_MOVE_DELAY } from "./constants";

const NUM_ITERATIONS = 100;
const PLAYOUT_DEPTH = 10;

interface Objective {
  checker: (G: GameState, ctx: Ctx) => boolean;
  weight: number;
}
declare type Objectives = Record<string, Objective>;

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
    objectives?: (G: any, ctx: Ctx, playerID?: PlayerID) => Objectives;
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
    this.setOpt("iterations", NUM_ITERATIONS);
    this.setOpt("playoutDepth", PLAYOUT_DEPTH);
  }

  override async play(state: State, playerID: PlayerID) {
    await sleep(AI_MOVE_DELAY);
    return super.play(state, playerID);
  }
}

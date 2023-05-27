import { Game, Ctx, PlayerID } from "boardgame.io";
import { MCTSBot } from "boardgame.io/ai";
import { GameState } from "../../entity";
import { calculateScore } from "../score";
import { SINGLE_PLAYER_ID } from "../../../utils/constants";

const NUM_ITERATIONS = 100;
const PLAYOUT_DEPTH = 10;

interface Objective {
  checker: (G: GameState, ctx: Ctx) => boolean;
  weight: number;
}
declare type Objectives = Record<string, Objective>;

// we give negative weight to player's score, making the bots
// like the states where player's score is lower
const objectivesMethod = (
  G: GameState,
  ctx: Ctx,
  playerID?: PlayerID
): Objectives => {
  const allStates = Object.values(G.players);
  const playerScore = calculateScore(
    allStates.find((p) => p.id === SINGLE_PLAYER_ID)!,
    allStates
  ).score;
  return {
    reducePlayerScore: {
      checker: () => true,
      weight: -playerScore,
    },
  };
};

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
      objectives: objectivesMethod,
      game,
      iterations,
      playoutDepth,
      iterationCallback,
    });
    this.setOpt("async", true);
    this.setOpt("iterations", NUM_ITERATIONS);
    this.setOpt("playoutDepth", PLAYOUT_DEPTH);
  }
}

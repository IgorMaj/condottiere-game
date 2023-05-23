import { createMercenary1 } from "../cards/mercenaries/Mercenary1";
import { createMercenary10 } from "../cards/mercenaries/Mercenary10";
import { createMercenary2 } from "../cards/mercenaries/Mercenary2";
import { createSurrender } from "../cards/powers/Surrender";
import { createHeroine } from "../cards/special/Heroine";
import { GameContext, GameState, PlayerState, Players } from "../entity";
import {
  battleTeamwork,
  botScoresHigherThanPlayer,
  gameStateIsNotDraw,
  notSurrenderOnFirstMove,
  singleplayerPassed,
} from "./utils";

describe("Utils method Test Suite", () => {
  test("notSurrenderOnFirstMove (turn) test", () => {
    const mockGameState = (numPlayers: number): GameState => {
      const players: Players = {} as Players;
      for (let i = 0; i < numPlayers; i++) {
        players[i] = {
          id: `${i}`,
          passed: false,
        } as PlayerState;
      }
      return {
        players,
      } as unknown as GameState;
    };

    expect(
      notSurrenderOnFirstMove(createMercenary1(), mockGameState(2), {
        turn: 3,
      } as GameContext)
    ).toBe(true);
    expect(
      notSurrenderOnFirstMove(createMercenary1(), mockGameState(4), {
        turn: 4,
      } as GameContext)
    ).toBe(true);
    expect(
      notSurrenderOnFirstMove(createSurrender(), mockGameState(2), {
        turn: 2,
      } as GameContext)
    ).toBe(false);
    expect(
      notSurrenderOnFirstMove(createSurrender(), mockGameState(3), {
        turn: 2,
      } as GameContext)
    ).toBe(false);
    expect(
      notSurrenderOnFirstMove(createSurrender(), mockGameState(2), {
        turn: 1,
      } as GameContext)
    ).toBe(false);
  });

  test("singleplayerPassed test", () => {
    expect(
      singleplayerPassed({
        players: { "0": { passed: false } },
      } as unknown as GameState)
    ).toBe(false); // the player did not pass
    expect(
      singleplayerPassed({
        players: { "0": { passed: true } },
      } as unknown as GameState)
    ).toBe(true); // the player passed
  });

  test("gameStateIsNotDraw test", () => {
    expect(
      gameStateIsNotDraw({
        players: {
          "0": {
            id: "0",
            battleLine: [createMercenary1()],
          },
          "1": {
            id: "1",
            battleLine: [createMercenary2()],
          },
        },
      } as unknown as GameState)
    ).toBe(true); // game is not draw, player "1" is a little stronger

    expect(
      gameStateIsNotDraw({
        players: {
          "0": {
            id: "0",
            battleLine: [createMercenary1(), createHeroine()],
          },
          "1": {
            id: "1",
            battleLine: [createMercenary1(), createMercenary10()],
          },
        },
      } as unknown as GameState)
    ).toBe(false); // game is draw in this case, so this isNotDraw is false
  });

  test("botScoresHigherThanPlayer test", () => {
    expect(
      botScoresHigherThanPlayer({
        players: {
          "0": {
            id: "0",
            battleLine: [createMercenary1()],
          },
          "1": {
            id: "1",
            battleLine: [createMercenary2()],
          },
          "2": {
            id: "2",
            battleLine: [],
          },
        },
      } as unknown as GameState)
    ).toBe(true); // bot "1" has the highest score
    expect(
      botScoresHigherThanPlayer({
        players: {
          "0": {
            id: "0",
            battleLine: [createMercenary1(), createHeroine()],
          },
          "1": {
            id: "1",
            battleLine: [createMercenary1(), createMercenary10()],
          },
          "2": {
            id: "2",
            battleLine: [
              createMercenary1(),
              createMercenary10(),
              createMercenary1(),
            ],
          },
        },
      } as unknown as GameState)
    ).toBe(true); // bot "2" has the highest score

    expect(
      botScoresHigherThanPlayer({
        players: {
          "0": {
            id: "0",
            battleLine: [createMercenary1(), createHeroine()],
          },
          "1": {
            id: "1",
            battleLine: [createMercenary1()],
          },
          "2": {
            id: "2",
            battleLine: [createMercenary1(), createMercenary1()],
          },
        },
      } as unknown as GameState)
    ).toBe(false); // player has the highest score
  });

  test("battleTeamwork test", () => {
    const state = {
      players: {
        "0": {
          id: "0",
          passed: false,
          battleLine: [createMercenary1(), createHeroine()],
        },
        "1": {
          id: "1",
          passed: false,
          battleLine: [createMercenary1(), createMercenary10()],
        },
        "2": {
          id: "2",
          passed: false,
          battleLine: [
            createMercenary1(),
            createMercenary10(),
            createMercenary1(),
          ],
        },
      },
    } as unknown as GameState;
    // player is weaker but hasn't passed yet
    expect(battleTeamwork(state)).toBe(false);
    // player has passed, others should preserve their forces
    state.players["0"].passed = true;
    expect(battleTeamwork(state)).toBe(true);
  });
});

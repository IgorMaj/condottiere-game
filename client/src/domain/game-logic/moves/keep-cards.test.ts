import { GameContext } from "../../entity";
import { initGameData } from "../game";
import { keepCards } from "./keep-cards";

describe("Keep Cards Move Test Suite", () => {
  test("keepCards valid test", () => {
    const G = initGameData(2);
    G.players["0"].passed = true;
    G.players["1"].passed = true;
    G.players["1"].hand = [];

    const ctx = { currentPlayer: "0" } as unknown as GameContext;

    // player 0 still has cards left, we keep first 2
    const cardIds = G.players["0"].hand.map((c) => c.id).slice(0, 2);
    const events = {
      endTurn: jest.fn(() => {}),
      endPhase: jest.fn(() => {}),
    };

    keepCards({ G, ctx, events }, cardIds);

    expect(G.players["0"].hand.length).toBe(2);
    expect(events.endTurn).toBeCalled();
    expect(events.endPhase).toBeCalled();
  });

  test("keepCards invalid test", () => {
    const G = initGameData(2);
    G.players["0"].passed = true;
    G.players["1"].passed = true;
    G.players["1"].hand = [];

    const ctx = { currentPlayer: "0" } as unknown as GameContext;

    // player 0 still has cards left, we keep first 5 (should fail)
    const cardIds = G.players["0"].hand.map((c) => c.id).slice(0, 5);
    const events = {
      endTurn: jest.fn(() => {}),
      endPhase: jest.fn(() => {}),
    };

    expect(() => keepCards({ G, ctx, events }, cardIds)).toThrow();
    expect(events.endTurn).not.toBeCalled();
    expect(events.endPhase).not.toBeCalled();
  });
});

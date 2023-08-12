import { createMercenary1 } from "../../cards/mercenaries/Mercenary1";
import { GameState } from "../../entity";
import {
  firstPlayerWhoStillHasCards,
  onlyOnePlayerHasCards,
} from "./keep-cards";

describe("Keep Cards Test Suite", () => {
  test("firstPlayerWhoStillHasCards test", () => {
    let G = {
      players: {
        "1": { id: "1", hand: [createMercenary1()] },
        "2": { id: "2", hand: [] },
      },
    } as unknown as GameState;
    // first player has a card left
    expect(firstPlayerWhoStillHasCards({ G })).toBe(1);

    G = {
      players: {
        "1": { id: "1", hand: [] },
        "2": { id: "2", hand: [] },
      },
    } as unknown as GameState;
    // no players have cards left
    expect(firstPlayerWhoStillHasCards({ G })).toBe(0);
  });

  test("onlyOnePlayerHasCards test", () => {
    let G = {
      players: {
        "1": { id: "1", hand: [createMercenary1()] },
        "2": { id: "2", hand: [] },
      },
    } as unknown as GameState;
    // first player has a card left
    expect(onlyOnePlayerHasCards(G)).toBe(true);

    G = {
      players: {
        "1": { id: "1", hand: [] },
        "2": { id: "2", hand: [] },
      },
    } as unknown as GameState;
    // no players have cards left
    expect(onlyOnePlayerHasCards(G)).toBe(false);
  });
});

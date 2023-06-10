import { initGameData } from "../game";
import { advanceRound, discardBattleLines } from "./multiplayer";

describe("Multiplayer Events Test Suite", () => {
  test("discardBattleLines test", () => {
    const gameState = initGameData(2);
    let card = gameState.players["0"].hand.pop();
    gameState.players["0"].battleLine.push(card!);

    card = gameState.players["1"].hand.pop();
    gameState.players["1"].battleLine.push(card!);

    gameState.players["0"].passed = true;
    gameState.players["1"].passed = true;

    expect(gameState.players["0"].battleLine.length).toBe(1);
    expect(gameState.players["1"].battleLine.length).toBe(1);

    discardBattleLines(gameState);

    expect(gameState.players["0"].battleLine.length).toBe(0);
    expect(gameState.players["1"].battleLine.length).toBe(0);

    expect(gameState.players["0"].passed).toBe(false);
    expect(gameState.players["1"].passed).toBe(false);
  });

  test("advanceRound trigger test", () => {
    // Dealings of new cards in this case
    const gameState = initGameData(2);
    gameState.players["0"].battleLine.push(...gameState.players["0"].hand);
    gameState.players["0"].hand = [];

    expect(gameState.players["0"].hand.length).toBe(0);

    advanceRound(gameState);

    expect(gameState.players["0"].hand.length).not.toBe(0);
  });

  test("advanceRound no trigger test", () => {
    // No dealings of new cards in this case
    const gameState = initGameData(2);
    const card = gameState.players["0"].hand.pop();
    gameState.players["0"].battleLine.push(card!);

    const handLength = gameState.players["0"].hand.length;
    expect(handLength).not.toBe(0);

    advanceRound(gameState);

    expect(gameState.players["0"].hand.length).toBe(handLength);
  });
});

import { initBattleGame } from "./battle-game";

describe("Init battle test suite", () => {
  test("Init battle game test", () => {
    const inited = initBattleGame();
    expect(inited.ai).toBeTruthy();
    expect(inited.endIf).toBeTruthy();
    expect(inited.phases?.default?.turn?.minMoves).toBeTruthy();
    expect(inited.phases?.default?.turn?.maxMoves).toBeTruthy();
    expect(inited.phases?.default?.turn?.order?.first).toBeTruthy();
    expect(inited.phases?.default?.turn?.order?.next).toBeTruthy();
    expect(inited.phases?.keepCards?.turn?.minMoves).toBeTruthy();
    expect(inited.phases?.keepCards?.turn?.maxMoves).toBeTruthy();
    expect(inited.phases?.keepCards?.turn?.order?.first).toBeTruthy();
    expect(inited.phases?.keepCards?.turn?.order?.next).toBeTruthy();
  });
});

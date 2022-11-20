import { initBattleGame } from './battle-game';

describe('Init battle test suite', () => {
  test('Init map game test', () => {
    const inited = initBattleGame();
    expect(inited.ai).toBeTruthy();
    expect(inited.endIf).toBeTruthy();
    expect(inited.turn?.minMoves).toBeTruthy();
    expect(inited.turn?.maxMoves).toBeTruthy();
    expect(inited.turn?.order?.first).toBeTruthy();
    expect(inited.turn?.order?.next).toBeTruthy();
  });
});

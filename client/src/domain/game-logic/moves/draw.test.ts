import { GameContext } from '../../entity';
import { initGameData } from '../game';
import { drawCard } from './draw';

describe('Draw Test Suite', () => {
  test('Draw test', () => {
    const state = initGameData(2);
    const mockedCtx = {
      currentPlayer: '0',
    } as GameContext;
    const origLength = state.players['0'].hand.length;
    drawCard({ G: state, ctx: mockedCtx });
    expect(state.players['0'].hand.length).toBe(origLength + 1);
  });
});

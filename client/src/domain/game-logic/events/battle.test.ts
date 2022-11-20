import { createMercenary1 } from '../../cards/mercenaries/Mercenary1';
import { GameContext } from '../../entity';
import { initGameData } from '../game';
import { endIf, first, next } from './battle';

describe('Battle Event Test Suite', () => {
  test('endIf test', () => {
    const state = initGameData(2);
    const mockedCtx = {
      currentPlayer: '0',
    } as GameContext;
    expect(endIf({ G: state, ctx: mockedCtx })).toBeFalsy();
    state.players['0'].passed = true;
    state.players['1'].passed = true;
    expect(endIf({ G: state, ctx: mockedCtx })?.draw).toBeTruthy();
    state.players['0'].battleLine = [createMercenary1()];
    expect(endIf({ G: state, ctx: mockedCtx })?.winner).toBeTruthy();
  });

  test('first battle turn test', () => {
    const state = initGameData(2);
    state.players['0'].passed = true;
    const mockedCtx = {
      playOrder: ['0', '1'],
    } as GameContext;
    state.condottiereTokenOwnerHistory = ['1'];
    expect(first({ G: state, ctx: mockedCtx })).toBe(1);
  });

  test('next battle turn test', () => {
    const state = initGameData(2);
    const mockedCtx = {
      playOrder: ['0', '1'],
      playOrderPos: 0,
      numPlayers: 2,
    } as GameContext;
    state.condottiereTokenOwnerHistory = ['1'];
    expect(next({ G: state, ctx: mockedCtx })).toBe(1);
  });
});

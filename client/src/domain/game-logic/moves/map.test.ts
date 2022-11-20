import {
  CONDOTTIERE_TOKEN_ID,
  POPE_TOKEN_ID,
  TerritoryStatus,
} from '../../../utils/constants';
import { GameContext } from '../../entity';
import { initGameData } from '../game';
import { setTokenOnTerritory } from './map';

describe('Battle Moves Test Suite', () => {
  test('Put pope token on territory', () => {
    const state = initGameData(2);
    const mockedCtx = {
      currentPlayer: '0',
    } as GameContext;
    const mockedEndTurn = jest.fn(() => {
      console.log('Mocked end turn called');
    });
    state.popeTokenOwnerId = '0';
    const mockedEvents = { endTurn: mockedEndTurn };
    setTokenOnTerritory(
      { G: state, ctx: mockedCtx, events: mockedEvents },
      'Firenze',
      POPE_TOKEN_ID
    );
    expect(mockedEndTurn).not.toBeCalled();
    state.territories.find((t) => t.name === 'Firenze')?.status ===
      TerritoryStatus.POPE;
  });

  test('Put condottiere token on territory', () => {
    const state = initGameData(2);
    const mockedCtx = {
      currentPlayer: '0',
    } as GameContext;
    const mockedEndTurn = jest.fn(() => {
      console.log('Mocked end turn called');
    });
    state.condottiereTokenOwnerId = '0';
    const mockedEvents = { endTurn: mockedEndTurn };
    setTokenOnTerritory(
      { G: state, ctx: mockedCtx, events: mockedEvents },
      'Firenze',
      CONDOTTIERE_TOKEN_ID
    );
    expect(mockedEndTurn).not.toBeCalled();
    state.territories.find((t) => t.name === 'Firenze')?.status ===
      TerritoryStatus.BATTLE;
  });
});

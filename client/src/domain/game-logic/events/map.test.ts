import { TerritoryStatus } from '../../../utils/constants';
import { GameContext } from '../../entity';
import { initGameData } from '../game';
import { endIf } from './map';
import { nextTurn } from './map-common';

describe('Map Event Test Suite', () => {
  test('endIf Test', () => {
    let state = initGameData(2);
    let wonTerritories = ['Firenze', 'Roma'];
    state.territories = state.territories.map((t) =>
      wonTerritories.includes(t.name)
        ? { ...t, owner: '0', status: TerritoryStatus.TAKEN }
        : t
    );

    expect(endIf({ G: state, ctx: {} as GameContext })?.winner).toBeFalsy();

    state = initGameData(2);
    wonTerritories = ['Firenze', 'Roma', 'Napoli', 'Speleto'];
    state.territories = state.territories.map((t) =>
      wonTerritories.includes(t.name)
        ? { ...t, owner: '0', status: TerritoryStatus.TAKEN }
        : t
    );

    expect(endIf({ G: state, ctx: {} as GameContext })?.winner).toBeTruthy();

    state = initGameData(2);
    wonTerritories = ['Firenze', 'Roma', 'Napoli', 'Speleto'];
    state.territories = state.territories.map((t) =>
      wonTerritories.includes(t.name)
        ? { ...t, owner: '0', status: TerritoryStatus.TAKEN }
        : t
    );

    expect(endIf({ G: state, ctx: {} as GameContext })?.winner).toBeTruthy();

    state = initGameData(2);
    wonTerritories = [
      'Torino',
      'Venezia',
      'Firenze',
      'Siena',
      'Aurona',
      'Bologna',
    ];
    state.territories = state.territories.map((t) =>
      wonTerritories.includes(t.name)
        ? { ...t, owner: '0', status: TerritoryStatus.TAKEN }
        : t
    );

    expect(endIf({ G: state, ctx: {} as GameContext })?.winner).toBeTruthy();
  });

  test('Next turn test', () => {
    const state = initGameData(2);
    expect(nextTurn({ G: state, ctx: {} as GameContext })).toBe(0);

    state.popeTokenOwnerId = '1';
    expect(nextTurn({ G: state, ctx: {} as GameContext })).toBe(1);
  });
});

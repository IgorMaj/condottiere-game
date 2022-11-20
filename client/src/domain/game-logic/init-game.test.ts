import { initGameData } from './game';

describe('Init game tests', () => {
  test('Standard Init Game Test', () => {
    const state = initGameData(2);
    expect(state.discardPile.length).toBe(0);
    expect(state.condottiereTokenOwnerId).toBe('0');
    // two players take 10 cards each
    expect(state.players[0].hand.length).toBe(10);
    expect(state.players[1].hand.length).toBe(10);
    expect(state.deck.length).toBe(90);
    expect(Object.keys(state.players).length).toBe(2);
    expect(state.territories.length).toBe(17);
  });
});

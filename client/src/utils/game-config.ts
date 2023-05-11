const P_KEY = "playerCount";

export const GameConfig = {
  get isInitialized(): boolean {
    return !!localStorage.getItem(P_KEY);
  },
  get PLAYER_WIN_TERRITORY_COUNT(): number {
    const playerCount = Number(localStorage.getItem(P_KEY));
    return playerCount === 2 || playerCount === 3 ? 6 : 5;
  },
  get PLAYER_ADJACENT_WIN_TERRITORY_COUNT(): number {
    const playerCount = Number(localStorage.getItem(P_KEY));
    return playerCount === 2 || playerCount === 3 ? 4 : 3;
  },
  get NUM_PLAYERS(): number {
    const init = !!localStorage.getItem(P_KEY);
    return init ? Number(localStorage.getItem(P_KEY)) : 1;
  },
  get NUM_BOTS(): number {
    const init = !!localStorage.getItem(P_KEY);
    return (init ? Number(localStorage.getItem(P_KEY)) : 1) - 1;
  },
  setConfig(conf: { numPlayers: number }) {
    localStorage.setItem(P_KEY, `${conf.numPlayers}`);
  },
  reset() {
    localStorage.removeItem(P_KEY);
  },
};

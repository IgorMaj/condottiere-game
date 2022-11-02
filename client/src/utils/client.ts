import { GameContext, GameState } from '../domain/entity';
import i18n from '../i18n';
import { GameConfig } from './game-config';
import { navigate } from './navigation';

export function registerAntiRefresh() {
  // To prevent accidental page refresh (at least give the user the option to decline)
  window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = '';
  });
  window.addEventListener('unload', () => {
    GameConfig.reset();
    navigate('/', { replace: true, state: null });
  });
}

export function historyState(): GameState {
  return window?.history?.state?.usr;
}

export function isMapPhase(ctx: GameContext) {
  return ctx.phase === 'map';
}

export function isBattlePhase(ctx: GameContext) {
  return ctx.phase === 'battle';
}

export function battleEndMessage(ctx: GameContext) {
  if (ctx?.gameover?.draw) {
    return i18n.t('Battle.draw');
  } else if (ctx?.gameover?.winner) {
    return `${i18n.t('Battle.wonBy')} P${ctx?.gameover?.winner}`;
  }
  return '';
}

export function gameEndMessage(ctx: GameContext) {
  if (ctx?.gameover?.draw) {
    return i18n.t('Game.draw');
  } else if (ctx?.gameover?.winner) {
    return `${i18n.t('Game.wonBy')} P${ctx?.gameover?.winner}`;
  }
  return '';
}

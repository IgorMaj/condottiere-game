import { NavigateFunction, NavigateOptions, To } from 'react-router-dom';
import { GameState } from '../domain/entity';
import { DELAYED_ACTION_TIMEOUT } from './constants';
import { resolveG } from './methods';

let nav: NavigateFunction | null = null;
export function registerNavigate(navigate: NavigateFunction) {
  nav = navigate;
}

export function navigate(to: To, options?: NavigateOptions) {
  nav?.(to, options);
}

export function toBattle(state: GameState) {
  state = resolveG(state);
  setTimeout(() => {
    navigate('/battle', {
      replace: true,
      state: state,
    });
  }, DELAYED_ACTION_TIMEOUT);
}

export function toMap(state: GameState) {
  state = resolveG(state);
  setTimeout(() => {
    navigate('/map', {
      replace: true,
      state: state,
    });
  }, DELAYED_ACTION_TIMEOUT);
}

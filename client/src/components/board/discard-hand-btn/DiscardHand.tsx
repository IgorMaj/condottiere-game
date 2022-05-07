import { GameContext, Moves, PlayerState } from '../../../domain/entity';
import {
  hasNoMercenaryCards,
  scarecrowPlayed,
} from '../../../domain/game-logic/utils';
import styles from './DiscardHand.module.scss';

export const DiscardHand = (props: {
  moves: Moves;
  ctx: GameContext;
  state: PlayerState;
}): JSX.Element => {
  const { moves, ctx, state } = props;
  const isEnabled =
    state.id === ctx.currentPlayer &&
    !scarecrowPlayed(state) &&
    hasNoMercenaryCards(state);
  return (
    <div
      onDoubleClick={() => moves?.discardHand()}
      className={isEnabled ? styles.Container : styles.ContainerDisabled}
      style={!isEnabled ? { pointerEvents: 'none' } : {}}
    >
      <span>Discard</span>
    </div>
  );
};

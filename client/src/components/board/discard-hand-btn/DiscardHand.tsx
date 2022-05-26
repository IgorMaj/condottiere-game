import { useTranslation } from 'react-i18next';
import { GameContext, Moves, PlayerState } from '../../../domain/entity';
import {
  hasOnlyNonMercenaryCards,
  scarecrowPlayed,
} from '../../../domain/game-logic/utils';
import styles from './DiscardHand.module.scss';

export const DiscardHand = (props: {
  moves: Moves;
  ctx: GameContext;
  state: PlayerState;
}): JSX.Element => {
  const { t } = useTranslation();
  const { moves, ctx, state } = props;
  const isEnabled =
    state.id === ctx.currentPlayer &&
    !scarecrowPlayed(state) &&
    hasOnlyNonMercenaryCards(state);
  return (
    <div
      onDoubleClick={() => moves?.discardHand()}
      className={isEnabled ? styles.Container : styles.ContainerDisabled}
      style={!isEnabled ? { pointerEvents: 'none' } : {}}
    >
      <span>{t('Battle.discard')}</span>
    </div>
  );
};

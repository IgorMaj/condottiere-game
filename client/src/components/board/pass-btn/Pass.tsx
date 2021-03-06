import { useTranslation } from 'react-i18next';
import { GameContext, Moves, PlayerState } from '../../../domain/entity';
import { scarecrowPlayed } from '../../../domain/game-logic/utils';
import styles from './Pass.module.scss';

export const Pass = (props: {
  moves: Moves;
  ctx: GameContext;
  state: PlayerState;
}): JSX.Element => {
  const { t } = useTranslation();
  const { moves, ctx, state } = props;
  const isEnabled = state.id === ctx.currentPlayer && !scarecrowPlayed(state);
  return (
    <div
      onDoubleClick={() => moves?.pass()}
      className={isEnabled ? styles.Container : styles.ContainerDisabled}
      style={!isEnabled ? { pointerEvents: 'none' } : {}}
    >
      <span>{t('Battle.pass')}</span>
    </div>
  );
};

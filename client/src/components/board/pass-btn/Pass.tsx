import { GameContext, Moves } from '../../../domain/entity';
import styles from './Pass.module.scss';

// shows that the battle has concluded
export const Pass = (props: {
  moves: Moves;
  ctx: GameContext;
  playerId: string;
}): JSX.Element => {
  const { moves, ctx, playerId } = props;
  const isPlaying = playerId === ctx.currentPlayer;
  return (
    <div
      onDoubleClick={() => moves?.pass()}
      className={isPlaying ? styles.Container : styles.ContainerDisabled}
      style={!isPlaying ? { pointerEvents: 'none' } : {}}
    >
      <span>PASS</span>
    </div>
  );
};

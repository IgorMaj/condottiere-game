import { PlayerState } from '../../../domain/entity';
import { calculateScores } from '../../../domain/game-logic/score';
import { PLAYER_COLORS } from '../../../utils/constants';
import styles from './ScoreBoard.module.scss';

export const ScoreBoard = (props: { model: PlayerState[] }): JSX.Element => {
  const { model } = props;
  const scores: { playerId: string; score: number }[] = calculateScores(model);
  return (
    <div className={styles.Container}>
      <div className={styles.ScoreElements}>
        {scores.map((score) => {
          return (
            <div
              key={score.playerId}
              style={{ color: PLAYER_COLORS[score.playerId] }}
              className={styles.ScoreElement}
            >{`P${score.playerId}: ${score.score}`}</div>
          );
        })}
      </div>
    </div>
  );
};

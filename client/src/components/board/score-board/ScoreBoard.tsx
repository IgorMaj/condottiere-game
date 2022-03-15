import { PlayerState } from '../../../domain/Game';
import styles from './ScoreBoard.module.scss';
import { calculateScores } from '../../../domain/board/Board';

export const ScoreBoard = (props: { model: PlayerState[] }): JSX.Element => {
  const { model } = props;
  const scores: { playerId: string; score: number }[] = calculateScores(model);
  return (
    <div className={styles.Container}>
      <div className={styles.ScoreElements}>
        {scores.map((score) => {
          return (
            <div
              className={styles.ScoreElement}
            >{`Player ${score.playerId} score: ${score.score}`}</div>
          );
        })}
      </div>
    </div>
  );
};

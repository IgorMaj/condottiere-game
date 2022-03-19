import { PlayerState } from '../../../domain/entity';
import { calculateScores } from '../../../domain/game-logic/score';
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
              className={styles.ScoreElement}
            >{`Player ${score.playerId} score: ${score.score}`}</div>
          );
        })}
      </div>
    </div>
  );
};

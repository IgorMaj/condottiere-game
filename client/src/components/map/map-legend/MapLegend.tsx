import { GameState } from '../../../domain/entity';
import { calculateTotalTerritoryCounts } from '../../../domain/game-logic/score';
import { PLAYER_COLORS } from '../../../utils/constants';
import styles from './MapLegend.module.scss';

export const MapLegend = (props: { G: GameState }): JSX.Element => {
  const { G } = props;
  const scores: { playerId: string; score: number }[] =
    calculateTotalTerritoryCounts(G);
  return (
    <div className={styles.Container}>
      <div className={styles.ScoreElements}>
        {scores.map((score) => {
          return (
            <div key={score.playerId} className={styles.ScoreElement}>
              <span
                className={styles.Point}
                style={{ background: PLAYER_COLORS[score.playerId] }}
              ></span>
              <span
                className={styles.ScoreText}
              >{`P${score.playerId}: ${score.score}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import { GameContext, GameState } from '../../../domain/entity';
import { calculateTotalTerritoryCounts } from '../../../domain/game-logic/score';
import { getCrownIcon } from '../../../utils/client';
import { PLAYER_COLORS } from '../../../utils/constants';
import styles from './MapLegend.module.scss';

export const MapLegend = (props: {
  G: GameState;
  ctx: GameContext;
}): JSX.Element => {
  const { G, ctx } = props;
  const scores: { playerId: string; score: number }[] =
    calculateTotalTerritoryCounts(G);
  return (
    <div className={styles.Container}>
      <div className={styles.ScoreElements}>
        {scores.map((score) => {
          return (
            <div
              key={score.playerId}
              className={`${styles.ScoreElement} ${
                score.playerId === ctx.currentPlayer ? styles.Underlined : ''
              }`}
            >
              <span
                className={styles.Point}
                style={{ background: PLAYER_COLORS[score.playerId] }}
              >
                {ctx.gameover?.winner === score.playerId ? getCrownIcon() : ''}
              </span>
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

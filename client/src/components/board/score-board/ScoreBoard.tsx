import { GameContext, PlayerState } from "../../../domain/entity";
import { calculateScores } from "../../../domain/game-logic/score";
import { PLAYER_COLORS } from "../../../utils/constants";
import styles from "./ScoreBoard.module.scss";

function currentTurn(
  playerId: string,
  currentPlayerId: string,
  passed: boolean
) {
  return playerId === currentPlayerId
    ? {
        textDecoration: `underline ${passed ? "line-through" : ""}`,
      }
    : {
        ...(passed
          ? {
              textDecoration: "line-through",
            }
          : {}),
      };
}

export const ScoreBoard = (props: {
  model: PlayerState[];
  ctx: GameContext;
}): JSX.Element => {
  const { model, ctx } = props;
  const scores: { playerId: string; score: number }[] = calculateScores(model);
  return (
    <div className={styles.Container}>
      <div className={styles.ScoreElements}>
        {scores.map((score, index: number) => {
          return (
            <div
              key={score.playerId}
              style={{
                color: PLAYER_COLORS[score.playerId],
                ...currentTurn(
                  score.playerId,
                  ctx.currentPlayer,
                  model[index].passed
                ),
              }}
              className={styles.ScoreElement}
            >{`P${score.playerId}: ${score.score}`}</div>
          );
        })}
      </div>
    </div>
  );
};

import { TransitionGroup } from "react-transition-group";
import {
  ICardModel,
  GameContext,
  Moves,
  PlayerState,
} from "../../../domain/entity";
import { scarecrowPlayed } from "../../../domain/game-logic/utils";
import { isMapPhase } from "../../../utils/client";
import { OPACITY } from "../../../utils/constants";
import { CardTransition } from "../../card-transition/CardTransition";
import { DragCard } from "./DragCard";
import styles from "./Hand.module.scss";

export const Hand = (props: {
  state: PlayerState;
  ctx: GameContext;
  moves: Moves;
}) => {
  const { state, moves, ctx } = props;
  const playerId = state.id;
  const model = state.hand;
  const handDisabled =
    playerId !== ctx.currentPlayer || scarecrowPlayed(state) || isMapPhase(ctx);

  return (
    <div
      className={styles.Container}
      style={handDisabled ? { opacity: OPACITY } : {}}
    >
      {!model?.length && <div className={styles.Empty}></div>}
      <TransitionGroup component={null}>
        {model.map((card: ICardModel, index: number) => {
          return (
            <CardTransition key={card.id}>
              <div className={handDisabled ? styles.Disabled : ""}>
                <DragCard
                  card={card}
                  key={card.id}
                  playerId={playerId}
                  moves={moves}
                ></DragCard>
              </div>
            </CardTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

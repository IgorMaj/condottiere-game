import {
  ICardModel,
  GameContext,
  Moves,
  PlayerState,
} from '../../../domain/entity';
import { scarecrowPlayed } from '../../../domain/game-logic/utils';
import { DragCard } from './DragCard';
import styles from './Hand.module.scss';

export const Hand = (props: {
  state: PlayerState;
  ctx: GameContext;
  moves: Moves;
}) => {
  const { state, moves, ctx } = props;
  const playerId = state.id;
  const model = state.hand;
  const handDisabled = playerId !== ctx.currentPlayer || scarecrowPlayed(state);
  return (
    <div
      className={styles.Container}
      style={handDisabled ? { pointerEvents: 'none' } : {}}
    >
      {!model?.length && <div className={styles.Empty}></div>}
      {model.map((card: ICardModel) => {
        return (
          <DragCard
            card={card}
            key={card.id}
            playerId={playerId}
            moves={moves}
          ></DragCard>
        );
      })}
    </div>
  );
};

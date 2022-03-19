import { ICardModel, GameContext } from '../../../domain/entity';
import { DragCard } from './DragCard';
import styles from './Hand.module.scss';

export const Hand = (props: {
  model: ICardModel[];
  playerId: string;
  ctx: GameContext;
  moves: Record<string, (...args: any[]) => void>;
}) => {
  const { model, moves, playerId, ctx } = props;
  return (
    <div
      className={styles.Container}
      style={playerId !== ctx.currentPlayer ? { pointerEvents: 'none' } : {}}
    >
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

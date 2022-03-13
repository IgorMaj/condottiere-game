import { ICardModel } from '../../cards/Card';
import { DragCard } from './DragCard';
import styles from './Hand.module.scss';

export const Hand = (props: {
  model: ICardModel[];
  playerId: string;
  moves: Record<string, (...args: any[]) => void>;
}) => {
  const { model, moves, playerId } = props;
  return (
    <div className={styles.Container}>
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

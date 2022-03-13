import { useDrop } from 'react-dnd';
import { ICardModel, Card } from '../../cards/Card';
import styles from './BattleLine.module.scss';

export const BattleLine = (props: {
  model: ICardModel[];
  playerId: string;
  moves: Record<string, (...args: any[]) => void>;
}) => {
  const { model, playerId, moves } = props;
  const [, dropRef] = useDrop({
    accept: `player_${playerId}`,
    drop: (card: { id: string }) => {
      moves?.playCard?.(card.id);
    },
  });

  return (
    <div className={styles.Container} ref={dropRef}>
      {model.map((card: ICardModel) => {
        return <Card key={card.id} model={card} />;
      })}
    </div>
  );
};

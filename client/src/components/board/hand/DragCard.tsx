import { useDrag } from 'react-dnd';
import { ICardModel } from '../../../domain/entity';
import { Card } from '../../cards/Card';
import styles from './Hand.module.scss';

export const DragCard = (props: {
  card: ICardModel;
  playerId: string;
  moves: Record<string, (...args: any[]) => void>;
}) => {
  const { card, playerId, moves } = props;
  const [{ opacity }, dragRef] = useDrag(() => ({
    type: `player_${playerId}`,
    item: { id: card.id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));
  return (
    <div
      style={{
        opacity: opacity,
        cursor: 'pointer',
        height: 'fit-content',
        width: 'fit-content',
      }}
      ref={dragRef}
    >
      <div
        onDoubleClick={() => {
          moves?.playCard?.(card.id);
        }}
        className={styles.Drag}
      >
        <Card model={card} />
      </div>
    </div>
  );
};

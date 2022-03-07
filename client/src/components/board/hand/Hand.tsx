import { ICardModel, Card } from '../../cards/Card';
import styles from './Hand.module.scss';

export const Hand = (props: {
  model: ICardModel[];
  moves: Record<string, (...args: any[]) => void>;
}) => {
  const { model, moves } = props;
  return (
    <div className={styles.Container}>
      {model.map((card: ICardModel, index: number) => {
        return (
          <div
            onClick={() => {
              moves?.playCard?.(card.id);
            }}
            className={styles.Drag}
            key={index}
          >
            <Card model={card} />
          </div>
        );
      })}
    </div>
  );
};

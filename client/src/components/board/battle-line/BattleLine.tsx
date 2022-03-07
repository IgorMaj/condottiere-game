import { ICardModel, Card } from '../../cards/Card';
import styles from './BattleLine.module.scss';

export const BattleLine = (props: { model: ICardModel[] }) => {
  const { model } = props;
  return (
    <div className={styles.Container}>
      {model.map((card: ICardModel, index: number) => {
        return <Card key={index} model={card} />;
      })}
    </div>
  );
};

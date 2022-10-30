import { ICardModel } from '../../domain/entity';
import styles from './Card.module.scss';

export const Card = (props: { model: ICardModel }): JSX.Element => {
  const { model } = props;
  return (
    <div
      className={styles.Container}
      style={{
        backgroundImage: `url(${require(`../../assets/cards/${model.image}`)})`,
      }}
    ></div>
  );
};

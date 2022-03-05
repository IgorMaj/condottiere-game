import styles from './Card.module.scss';

export interface ICardModel {
  image: string;
  id: string;
  type: string;
}

export const Card = (props: { model: ICardModel }): JSX.Element => {
  const { model } = props;
  return (
    <div
      className={styles.Container}
      style={{ backgroundImage: `url('${model.image}')` }}
    ></div>
  );
};

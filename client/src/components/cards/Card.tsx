import styles from './Card.module.scss';
/**
 * class denotes the exact kind of the card i.e mercenary10 (Knight), or courtesan
 * type denotes broader type, i.e mercenaries
 * id, denotes exact card id, so we can search it in collections etc
 */
export interface ICardModel {
  id: string;
  image: string;
  class: string;
  type: string;
}

export const Card = (props: { model: ICardModel }): JSX.Element => {
  const { model } = props;
  return (
    <div
      className={styles.Container}
      style={{
        backgroundImage: `url('${model.image}')`,
      }}
    ></div>
  );
};

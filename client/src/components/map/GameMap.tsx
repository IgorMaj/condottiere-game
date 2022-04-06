import styles from './GameMap.module.scss';
import MAP_IMG from '../../assets/map.jpg';

export const GameMap = (): JSX.Element => {
  return (
    <div className={styles.Container}>
      <div className={styles.MapContainer}>
        <img src={MAP_IMG} alt={''} />
      </div>
    </div>
  );
};

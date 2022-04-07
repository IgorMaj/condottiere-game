import styles from './GameMap.module.scss';

const points = [
  {
    name: 'Torino',
    top: '9%',
    left: '8%',
  },
  {
    name: 'Genova',
    top: '23.5%',
    left: '6.5%',
  },
  {
    name: 'Milano',
    top: '8%',
    left: '14%',
  },
];

export const GameMap = (): JSX.Element => {
  return (
    <div className={styles.Container}>
      <div className={styles.MapContainer}>
        {points.map((point, index: number) => {
          return (
            <div
              key={index}
              className={styles.Point}
              style={{
                top: point.top,
                left: point.left,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

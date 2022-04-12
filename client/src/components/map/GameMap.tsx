import ReactTooltip from 'react-tooltip';
import styles from './GameMap.module.scss';

const territories = [
  {
    name: 'Torino',
    top: '9%',
    left: '7.8%',
  },
  {
    name: 'Genova',
    top: '23.5%',
    left: '13%',
  },
  {
    name: 'Milano',
    top: '8%',
    left: '27%',
  },
  {
    name: 'Venezia',
    top: '15.2%',
    left: '64.6%',
  },
  {
    name: 'Mantova',
    top: '18.5%',
    left: '42.8%',
  },
  {
    name: 'Modena',
    top: '25.5%',
    left: '41%',
  },
  {
    name: 'Parma',
    top: '33.5%',
    left: '26.5%',
  },
  {
    name: 'Curra',
    top: '40%',
    left: '25.65%',
  },
  {
    name: 'Urbino',
    top: '47.5%',
    left: '65.25%',
  },
  {
    name: 'Aurona',
    top: '53.2%',
    left: '78.3%',
  },
  {
    name: 'Siena',
    top: '51.5%',
    left: '33.5%',
  },
  {
    name: 'Firenze',
    top: '41.35%',
    left: '45.3%',
  },
  {
    name: 'Bologna',
    top: '31.8%',
    left: '49%',
  },
  {
    name: 'Ferrara',
    top: '26.8%',
    left: '55.5%',
  },
  {
    name: 'Speleto',
    top: '58.8%',
    left: '57%',
  },
  {
    name: 'Roma',
    top: '73.5%',
    left: '54.25%',
  },
  {
    name: 'Napoli',
    top: '88.5%',
    left: '79%',
  },
];

export const GameMap = (): JSX.Element => {
  return (
    <div className={styles.Container}>
      <div className={styles.MapContainer}>
        {territories.map((point, index: number) => {
          return (
            <div key={index} className={styles.PointContainer}>
              <div
                data-tip
                data-for={`${point.name}Tip`}
                className={styles.Point}
                style={{
                  top: point.top,
                  left: point.left,
                }}
              ></div>
              <ReactTooltip id={`${point.name}Tip`} place="top" effect="solid">
                {point.name}
              </ReactTooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

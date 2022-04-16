import { Client } from 'boardgame.io/react';
import ReactTooltip from 'react-tooltip';
import { GameContext, GameState, Moves, Territory } from '../../domain/entity';
import { Game } from '../../domain/game-logic/Game';
import styles from './GameMap.module.scss';
import { TokenContainer } from './token-container/TokenContainer';

const GameMapView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
}): JSX.Element => {
  const {
    G,
    G: { territories },
    moves,
    ctx,
  } = props;
  return (
    <div className={styles.Container}>
      <div className={styles.MapContainer}>
        {territories.map((point: Territory, index: number) => {
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
      <div className={styles.OuterTokenContainer}>
        <TokenContainer ctx={ctx} G={G} moves={moves} playerId={'0'} />
      </div>
    </div>
  );
};

export const GameMap = Client({
  game: Game,
  board: GameMapView,
  debug: true,
});

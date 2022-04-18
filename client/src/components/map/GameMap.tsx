import { Client } from 'boardgame.io/react';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { GameContext, GameState, Moves, Territory } from '../../domain/entity';
import { Game } from '../../domain/game-logic/Game';
import {
  CONDOTTIERE_TOKEN_ID,
  POPE_TOKEN_ID,
  TerritoryStatus,
} from '../../utils/constants';
import styles from './GameMap.module.scss';
import { TokenContainer } from './token-container/TokenContainer';

const calculatePointStatus = (point: Territory, selectedTokenId: string) => {
  if (
    point.status === TerritoryStatus.FREE &&
    selectedTokenId === CONDOTTIERE_TOKEN_ID
  ) {
    return styles.CondottierePoint;
  }

  if (
    point.status === TerritoryStatus.FREE &&
    selectedTokenId === POPE_TOKEN_ID
  ) {
    return styles.PopePoint;
  }

  return '';
};

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
  const [selectedTokenId, setToken] = React.useState('');
  return (
    <div className={styles.Container}>
      <div className={styles.MapContainer}>
        {territories.map((point: Territory, index: number) => {
          return (
            <div key={index} className={styles.PointContainer}>
              <div
                data-tip
                data-for={`${point.name}Tip`}
                className={`${styles.Point} ${calculatePointStatus(
                  point,
                  selectedTokenId
                )}`}
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
        <TokenContainer
          selectedTokenId={selectedTokenId}
          selectToken={setToken}
          ctx={ctx}
          G={G}
          moves={moves}
          playerId={'0'}
        />
      </div>
    </div>
  );
};

export const GameMap = Client({
  game: Game,
  board: GameMapView,
  debug: true,
});

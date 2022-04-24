import React from 'react';
import ReactTooltip from 'react-tooltip';
import { GameContext, GameState, Moves, Territory } from '../../domain/entity';
import { initMapGame } from '../../domain/game-logic/map/map-game';
import {
  CONDOTTIERE_TOKEN_ID,
  PLAYER_COLORS,
  POPE_TOKEN_ID,
  TerritoryStatus,
} from '../../utils/constants';
import styles from './GameMap.module.scss';
import { TokenContainer } from './token-container/TokenContainer';
import { Client } from 'boardgame.io/react';
import { validGameState } from '../../utils/methods';
import { historyState } from '../../domain/game-logic/utils';
import { showAlert } from '../alert/alert.service';
import { toBattle } from '../../utils/navigation';

const calculatePointStatus = (point: Territory, selectedTokenId: string) => {
  if (
    point.status === TerritoryStatus.FREE &&
    selectedTokenId === CONDOTTIERE_TOKEN_ID
  ) {
    return styles.CondottierePoint;
  }

  if (point.status === TerritoryStatus.BATTLE) {
    return styles.BattlePoint;
  }

  if (
    point.status === TerritoryStatus.FREE &&
    selectedTokenId === POPE_TOKEN_ID
  ) {
    return styles.PopePoint;
  }

  if (point.status === TerritoryStatus.POPE) {
    return styles.PopeProtectionPoint;
  }

  return '';
};

const takenPointStyle = (point: Territory) => {
  console.log(point.status);
  return point.owner
    ? {
        border: `2px solid ${PLAYER_COLORS[`${point.owner}`]}`,
        backgroundColor: `${PLAYER_COLORS[`${point.owner}`]}`,
      }
    : {};
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
  React.useEffect(() => {
    if (!G.condottiereTokenOwnerId) {
      showAlert('Territory marked. The battle will start soon.');
      toBattle(G);
    }
  }, [G.condottiereTokenOwnerId, G]);
  return (
    <div className={styles.Container}>
      <div className={styles.MapContainer}>
        {territories.map((point: Territory, index: number) => {
          return (
            <div key={index} className={styles.PointContainer}>
              <div
                onClick={() => {
                  if (
                    point.status === TerritoryStatus.FREE &&
                    selectedTokenId
                  ) {
                    moves.setTokenOnTerritory(point.name, selectedTokenId);
                    setToken('');
                  }
                }}
                data-tip
                data-for={`${point.name}Tip`}
                className={`${styles.Point} ${calculatePointStatus(
                  point,
                  selectedTokenId
                )}`}
                style={{
                  top: point.top,
                  left: point.left,
                  ...takenPointStyle(point),
                }}
              ></div>
              <ReactTooltip id={`${point.name}Tip`} place="top" effect="solid">
                {point.name}
                {point.owner ? `(Player ${point.owner})` : ''}
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

export const GameMap = () => {
  // we extract the user state from here
  // (we use the history object to send the state to different games)
  const state = historyState();
  return Client({
    game: initMapGame(validGameState(state) ? state : undefined),
    board: GameMapView,
    debug: true,
  });
};

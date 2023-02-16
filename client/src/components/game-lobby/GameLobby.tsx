import { Lobby } from 'boardgame.io/react';
import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MultiplayerGame } from '../../domain/game-logic/multiplayer/multiplayer-game';
import { clearCookies } from '../../utils/client';
import { GAME_NAME } from '../../utils/constants';
import { MultiplayerGameView } from '../multiplayer/MultiplayerGame';
import Button from '../ui/button/Button';
import './GameLobby.scss';

const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ??
  `${window.location.protocol}//${window.location.hostname}:8000`;

const REFRESH_INTERVAL = 1500;

// Patched because it resulted in all sorts of visual
// and functional bugs (duplicates etc)
const refreshPatched = async function (this: any) {
  try {
    const { matches } = await this.client.listMatches(GAME_NAME);
    this.matches = _.uniqBy(matches, 'matchID');
  } catch (error) {
    throw new Error('failed to retrieve list of matches (' + error + ')');
  }
};

export const GameLobby = (): JSX.Element => {
  const ref = useRef<Lobby>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const conn = (ref?.current as any)?.connection;
    if (conn) {
      // patch the prototype because conn instance seems to change all the time
      conn.__proto__.refresh = refreshPatched;
    }
  }, [ref]);

  const backToMenu = () => {
    clearCookies();
    navigate('/', { replace: true, state: null });
  };

  const { t } = useTranslation();
  return (
    <>
      <div className='game-lobby-container'>
        <Lobby
          ref={ref}
          gameServer={SERVER_URL}
          lobbyServer={SERVER_URL}
          refreshInterval={REFRESH_INTERVAL}
          gameComponents={[
            { game: MultiplayerGame, board: MultiplayerGameView },
          ]}
        />
      </div>
      <div className='back-to-menu-container '>
        <Button label={t('Common.backToMenu')} onClick={backToMenu} />
      </div>
    </>
  );
};

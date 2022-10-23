import { Lobby } from 'boardgame.io/react';
import { MultiplayerGame } from '../../domain/game-logic/multiplayer/multiplayer-game';
import { MultiplayerBoardView } from '../board/Board';
import './GameLobby.scss';

const SERVER_URL = `${window.location.protocol}//${window.location.hostname}:8000`;

export const GameLobby = (): JSX.Element => {
  return (
    <div className="game-lobby-container">
      <Lobby
        gameServer={SERVER_URL}
        lobbyServer={SERVER_URL}
        gameComponents={[
          { game: MultiplayerGame, board: MultiplayerBoardView },
        ]}
      />
    </div>
  );
};

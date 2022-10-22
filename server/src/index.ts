import { Origins, Server } from 'boardgame.io/server';
import { MultiplayerGame } from '../../client/src/domain/game-logic/multiplayer/multiplayer-game';

const server = Server({
  // Provide the definitions for your game(s).
  games: [MultiplayerGame as any],

  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
});

server.run(8000, () => console.log('Server is running...'));

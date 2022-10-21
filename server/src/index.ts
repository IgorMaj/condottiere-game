import { Server } from 'boardgame.io/server';

const server = Server({
  // Provide the definitions for your game(s).
  games: [],

  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    '*',
  ],
});

server.run(8000, () => console.log('Server is running...'));

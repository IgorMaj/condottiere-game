import { Game } from 'boardgame.io';
import { Server } from 'boardgame.io/server';
import { MultiplayerGame } from './domain/game-logic/multiplayer/multiplayer-game';

const ALL_ORIGIN = new RegExp('.*');

const server = Server({
  // Provide the definitions for your game(s).
  games: [MultiplayerGame as unknown as Game],

  origins: [ALL_ORIGIN],
});

server.run(8000, () => console.log('Server is running...'));

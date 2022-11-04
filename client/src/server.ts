import { Game } from 'boardgame.io';
import { Server } from 'boardgame.io/server';
import { MultiplayerGame } from './domain/game-logic/multiplayer/multiplayer-game';

if (typeof String.prototype.replaceAll === 'undefined') {
  String.prototype.replaceAll = function (match, replace) {
    return this.replace(new RegExp(match, 'g'), () => replace as string);
  };
}

const ALL_ORIGIN = new RegExp('.*');
const PORT = Number(process.env.PORT) || 8000;

const server = Server({
  // Provide the definitions for your game(s).
  games: [MultiplayerGame as unknown as Game],

  origins: [ALL_ORIGIN],
});

server.run(PORT, () => console.log('Server is running...'));

import { showAlert } from '../../components/alert/alert.service';
import { popMultiple } from '../../utils/methods';
import { createDeck } from '../board/Board';
import {
  ICardModel,
  PlayerState,
  GameContext,
  GameState,
  Players,
} from '../entity';
import { AI } from './ai/battle';
import { initTerritories } from './map/game-map';
import { pass, playCard, scarecrow } from './moves/battle';
import { drawCard } from './moves/draw';
import { calculateScores } from './score';
import {
  allPlayersPassed,
  battleEnded,
  getCurrentBattleTerritory,
  isDraw,
} from './utils';

const initPlayer = (id: string, initialHand: ICardModel[]): PlayerState => {
  return {
    hand: initialHand,
    battleLine: [],
    id: id,
    passed: false,
  };
};

export const Game = {
  setup: (ctx: GameContext): GameState => {
    const deck = createDeck();
    const players: Players = {};
    for (let i = 0; i < ctx.numPlayers; i++) {
      players[`${i}`] = initPlayer(`${i}`, popMultiple(deck, 10));
    }
    return {
      deck: deck,
      players: players,
      territories: initTerritories(),
      popeTokenOwnerId: null,
      condottiereTokenOwnerId: '0',
    };
  },

  phases: {
    map: {
      next: 'battle',
      start: true,
      order: {
        first: (G: GameState, ctx: GameContext) =>
          Number(G.condottiereTokenOwnerId),
      },
      moves: {},
    },
    battle: {
      next: 'map',
      turn: {
        minMoves: 1,
        maxMoves: 2,
        order: {
          first: (G: GameState, ctx: GameContext) => 0,
          next: (G: GameState, ctx: GameContext) => {
            if (allPlayersPassed(Object.values(G))) {
              return;
            }
            // we seek to find a player who hasn't passed
            // Loop through next position until we do
            let nextPos = (ctx.playOrderPos + 1) % ctx.numPlayers;
            while (G.players[ctx.playOrder[nextPos]].passed) {
              nextPos = (nextPos + 1) % ctx.numPlayers;
            }
            return nextPos;
          },
        },
      },

      endIf: (G: GameState, ctx: GameContext) => {
        const playerStates = Object.values(G.players);
        if (!battleEnded(playerStates)) {
          return false;
        }
        const scoreObjs = calculateScores(playerStates);

        if (isDraw(scoreObjs)) {
          showAlert('The battle is a draw!');
          return true;
        }

        const maxScore = scoreObjs
          .map((score) => score.score)
          .reduce((a, b) => Math.max(a, b));

        // find the winner and assign the territory to them
        const winnerId = scoreObjs.find(
          (obj) => obj.score === maxScore
        )?.playerId;
        const rewardTerritory = getCurrentBattleTerritory(G.territories);
        G.territories = G.territories.map((t) =>
          t.name === rewardTerritory.name ? { ...t, owner: winnerId } : t
        );
        showAlert(`Battle won by Player(P${winnerId})`);
        return true;
      },

      moves: {
        playCard: playCard,
        pass: pass,
        drawCard: drawCard,
        scarecrow: scarecrow,
      },
    },
  },

  ai: AI,
};

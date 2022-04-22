import { showAlert } from '../../components/alert/alert.service';
import { TerritoryStatus } from '../../utils/constants';
import { popMultiple } from '../../utils/methods';
import { toMap } from '../../utils/navigation';
import { GameContext, GameState } from '../entity';
import { BATTLE_AI } from './ai/battle';
import { GameData } from './game';
import { playCard, pass, scarecrow } from './moves/battle';
import { drawCard } from './moves/draw';
import { calculateScores } from './score';
import {
  getCurrentBattleTerritory,
  isDraw,
  allPlayersPassed,
  battleEnded,
} from './utils';

export const initBattleGame = (state?: GameState) => {
  const BattleGame = {
    setup: (ctx: GameContext): GameState => {
      return state ?? GameData;
    },

    ai: BATTLE_AI,

    endIf: (G: GameState, ctx: GameContext) => {
      // TODO logic on condottiere and pope token
      const playerStates = Object.values(G.players);
      if (!battleEnded(playerStates)) {
        return;
      }

      const scoreObjs = calculateScores(playerStates);
      const battleTerritory = getCurrentBattleTerritory(G.territories);
      if (isDraw(scoreObjs)) {
        battleTerritory.status = TerritoryStatus.FREE;
        G.condottiereTokenOwnerId = '0';
        showAlert('It is a draw.');
        toMap(G);
        return { draw: true };
      }

      const maxScore = scoreObjs
        .map((score) => score.score)
        .reduce((a, b) => Math.max(a, b));

      // find the winner and assign the territory to them
      const winnerId = scoreObjs.find(
        (obj) => obj.score === maxScore
      )?.playerId;
      //TODO:  refactor this: cannot assign to readonly property
      battleTerritory.owner = winnerId as string;
      battleTerritory.status = TerritoryStatus.TAKEN;
      G.condottiereTokenOwnerId = '0';
      showAlert('Territory taken by a player.');
      toMap(G);
      return { winner: winnerId };
    },
    onBegin: (G: GameState, ctx: GameContext) => {
      // TODO: change card redraw logic
      for (let i = 0; i < ctx.numPlayers; i++) {
        const player = G.players[`${i}`];
        if (player.hand.length < 10) {
          player.hand.push(...popMultiple(G.deck, 5));
        }
        player.passed = false;
        player.battleLine = [];
      }
    },
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

    moves: {
      playCard: playCard,
      pass: pass,
      drawCard: drawCard,
      scarecrow: scarecrow,
    },
  };
  return BattleGame;
};

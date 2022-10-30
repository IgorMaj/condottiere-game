import { Game } from 'boardgame.io';
import { GameContext, GameState, MultiplayerGameState } from '../../entity';
import { first as firstBattle, next as nextBattle } from '../events/battle';
import { mapPhaseHasEnded, nextTurn as turnMap } from '../events/map-common';
import {
  battleHasEnded,
  gameHasEnded,
  onMapBegin,
  onBattleEnd,
  onMapEnd,
} from '../events/multiplayer';
import { initGameData } from '../game';
import { playCard, pass, scarecrow, discardHand } from '../moves/battle';
import { drawCard } from '../moves/draw';
import { setTokenOnTerritory } from '../moves/map';

export const MultiplayerGame: Game = {
  name: 'Condottiere',
  setup: ({ ctx }: { ctx: GameContext }): MultiplayerGameState => {
    return initGameData(ctx.numPlayers);
  },
  minPlayers: 2,
  maxPlayers: 6,

  endIf: gameHasEnded,

  phases: {
    map: {
      start: true,
      next: 'battle',
      endIf: mapPhaseHasEnded,
      onBegin: ({ G, ctx }: { G: GameState; ctx: GameContext }) => {
        // turn is 0 at the beginning of the game, at that point no battles have been fought
        if (ctx.turn) {
          onMapBegin({ G, ctx });
        }
      },
      onEnd: onMapEnd,
      turn: {
        minMoves: 1,
        maxMoves: 2,
        order: {
          first: turnMap,
          next: turnMap,
        },
      },

      moves: {
        setTokenOnTerritory: setTokenOnTerritory,
      },
    },
    battle: {
      next: 'map',
      endIf: battleHasEnded,
      onEnd: onBattleEnd,
      turn: {
        minMoves: 1,
        maxMoves: 2,
        order: {
          first: firstBattle,
          next: nextBattle,
        },
      },

      moves: {
        playCard: playCard,
        pass: pass,
        drawCard: drawCard,
        scarecrow: scarecrow,
        discardHand: discardHand,
      },
    },
  },
};

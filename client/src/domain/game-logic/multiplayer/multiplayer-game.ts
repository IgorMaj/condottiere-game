import { Game } from "boardgame.io";
import { GAME_NAME } from "../../../utils/constants";
import { GameContext, MultiplayerGameState } from "../../entity";
import { first as firstBattle, next as nextBattle } from "../events/battle";
import { mapPhaseHasEnded, nextTurn as turnMap } from "../events/map-common";
import {
  battleHasEnded,
  gameHasEnded,
  onBattleEnd,
  onMapEnd,
} from "../events/multiplayer";
import { initGameData } from "../game";
import { playCard, pass, scarecrow, discardHand } from "../moves/battle";
import { setTokenOnTerritory } from "../moves/map";
import { firstPlayerWhoStillHasCards } from "../events/keep-cards";
import { keepCards } from "../moves/keep-cards";

export const MultiplayerGame: Game = {
  name: GAME_NAME,
  setup: ({ ctx }: { ctx: GameContext }): MultiplayerGameState => {
    return initGameData(ctx.numPlayers);
  },
  minPlayers: 2,
  maxPlayers: 6,

  endIf: gameHasEnded,

  phases: {
    map: {
      start: true,
      next: "battle",
      endIf: mapPhaseHasEnded,
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
      next: "map",
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
        scarecrow: scarecrow,
        discardHand: discardHand,
      },
    },

    keepCards: {
      next: "battle",
      turn: {
        minMoves: 1,
        maxMoves: 1,
        order: {
          first: firstPlayerWhoStillHasCards,
          next: firstPlayerWhoStillHasCards,
        },
      },

      moves: {
        keepCards: keepCards,
      },
    },
  },
};

import styles from "./Board.module.scss";
import { Hand } from "./hand/Hand";
import { BattleLine } from "./battle-line/BattleLine";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ScoreBoard } from "./score-board/ScoreBoard";
import {
  GameContext,
  GameState,
  Moves,
  MultiplayerGameState,
  PlayerState,
} from "../../domain/entity";
import { Pass } from "./pass-btn/Pass";
import { initBattleGame } from "../../domain/game-logic/battle/battle-game";
import { Client } from "boardgame.io/react";
import { validGameState } from "../../utils/methods";
import { generateBots } from "../../domain/game-logic/utils";
import { toMap } from "../../utils/navigation";
import { showAlert } from "../../utils/alert/alert.service";
import React, { useCallback } from "react";
import { afterBattle } from "../../domain/game-logic/events/battle";
import { Local } from "boardgame.io/multiplayer";
import { DiscardHand } from "./discard-hand-btn/DiscardHand";
import { GameConfig } from "../../utils/game-config";
import { AsyncBot } from "../../domain/game-logic/ai/async";
import { battleEndMessage, historyState } from "../../utils/client";
import i18n from "../../i18n";
import KeepCardsDialog from "../keep-cards-dialog/KeepCardsDialog";
import { KEEP_CARDS_PHASE } from "../../utils/constants";

/**
 *
 * @param states
 * @param playerIndex
 * @returns battle lines reorder so that the last one is the one belonging
 * to the player playing the game. That way it's displayed as closest on the screen
 */
const reorderBattleLines = (states: PlayerState[], playerIndex?: number) => {
  const retVal = [...states];
  const playerState = retVal.splice(playerIndex ?? 0, 1)[0];
  retVal.reverse();
  retVal.push(playerState);
  return retVal;
};

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
  playerIndex: number;
  callback: (G: GameState, ctx: GameContext) => void; // triggers when G or ctx change
}): JSX.Element => {
  const { G, moves, ctx, playerIndex, callback } = props;
  const playerStates = Object.values(G.players);
  React.useEffect(() => {
    callback(G, ctx);
  }, [G, ctx, callback]);
  const playerID = `${playerIndex}`; // TODO simplify playerID and playerIndex relationship
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.Container}>
          <ScoreBoard model={playerStates} ctx={ctx} />
          {reorderBattleLines(playerStates, playerIndex).map(
            (playerState: PlayerState) => {
              return (
                <BattleLine
                  key={playerState.id}
                  state={playerState}
                  moves={moves}
                />
              );
            }
          )}
          <Hand
            ctx={ctx}
            moves={moves}
            state={playerStates[playerIndex ?? 0]}
          />
          <div className={styles.BtnsContainer}>
            <div className={styles.LeftBtnContainer}>
              <DiscardHand
                ctx={ctx}
                moves={moves}
                state={playerStates[playerIndex ?? 0]}
              />
            </div>
            <div className={styles.RightButtonContainer}>
              <Pass
                ctx={ctx}
                moves={moves}
                state={playerStates[playerIndex ?? 0]}
              />
            </div>
          </div>
        </div>
      </DndProvider>
      {ctx.phase === KEEP_CARDS_PHASE && ctx.currentPlayer === playerID && (
        <KeepCardsDialog cards={G.players[playerID].hand} moves={moves} />
      )}
    </>
  );
};

export const MultiplayerBoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
  playerID: string;
}) => {
  const playerIndex = Object.values(props.G.players).findIndex(
    (pState) => pState.id === props.playerID
  );
  const callback = useCallback(() => {
    const gameState = props.G as MultiplayerGameState;
    if (gameState?.battleEnded) {
      if (gameState?.battleWinner) {
        showAlert(`${i18n.t("Battle.wonBy")} P${gameState.battleWinner}`);
      } else {
        showAlert(i18n.t("Battle.draw"));
      }
    }
  }, [props.G]);
  return <BoardView {...props} playerIndex={playerIndex} callback={callback} />;
};

export const SinglePlayerBoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
}) => {
  const callback = useCallback((G: GameState, ctx: GameContext) => {
    if (ctx.gameover) {
      showAlert(battleEndMessage(ctx));
      toMap(afterBattle(G, ctx));
    }
  }, []);
  return <BoardView {...props} callback={callback} playerIndex={0} />;
};

export const Board = () => {
  const state = historyState();
  return Client({
    game: initBattleGame(validGameState(state) ? state : undefined),
    board: SinglePlayerBoardView,
    debug: false,
    multiplayer: Local({
      bots: generateBots(AsyncBot, GameConfig.NUM_BOTS),
    }),
    numPlayers: GameConfig.NUM_PLAYERS,
  });
};

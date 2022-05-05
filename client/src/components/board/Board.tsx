import styles from './Board.module.scss';
import { Hand } from './hand/Hand';
import { BattleLine } from './battle-line/BattleLine';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ScoreBoard } from './score-board/ScoreBoard';
import {
  GameContext,
  GameState,
  Moves,
  PlayerState,
} from '../../domain/entity';
import { Pass } from './pass-btn/Pass';
import { initBattleGame } from '../../domain/game-logic/battle/battle-game';
import { Client } from 'boardgame.io/react';
import { validGameState } from '../../utils/methods';
import {
  battleEndMessage,
  generateBots,
  historyState,
} from '../../domain/game-logic/utils';
import { toMap } from '../../utils/navigation';
import { showAlert } from '../alert/alert.service';
import React from 'react';
import { afterBattle } from '../../domain/game-logic/events/battle';
import { NUM_PLAYERS } from '../../utils/constants';
import { Local } from 'boardgame.io/multiplayer';
import { MCTSBot } from 'boardgame.io/ai';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
}): JSX.Element => {
  const { G, moves, ctx } = props;
  const playerStates = Object.values(G.players);
  React.useEffect(() => {
    if (ctx.gameover) {
      showAlert(battleEndMessage(ctx));
      toMap(afterBattle(G, ctx));
    }
  }, [ctx.gameover, G, ctx]);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.Container}>
        <ScoreBoard model={playerStates} />
        {[...playerStates].reverse().map((playerState: PlayerState) => {
          return (
            <BattleLine
              key={playerState.id}
              state={playerState}
              moves={moves}
            />
          );
        })}
        <Hand ctx={ctx} moves={moves} state={playerStates[0]} />
        <div className={styles.PassContainer}>
          <Pass ctx={ctx} moves={moves} state={playerStates[0]} />
        </div>
      </div>
    </DndProvider>
  );
};

export const Board = () => {
  const state = historyState();
  return Client({
    game: initBattleGame(validGameState(state) ? state : undefined),
    board: BoardView,
    debug: false,
    multiplayer: Local({
      bots: generateBots(MCTSBot, NUM_PLAYERS - 1),
    }),
    playerID: '0',
    numPlayers: NUM_PLAYERS,
  } as any);
};

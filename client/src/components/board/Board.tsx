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
import { initBattleGame } from '../../domain/game-logic/battle-game';
import { Client } from 'boardgame.io/react';
import { validGameState } from '../../utils/methods';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
}): JSX.Element => {
  const { G, moves, ctx } = props;
  const playerStates = Object.values(G.players);
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
  const state = window?.history?.state?.usr;
  return Client({
    game: initBattleGame(validGameState(state) ? state : undefined),
    board: BoardView,
    debug: true,
  });
};

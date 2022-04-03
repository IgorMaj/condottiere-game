import { Game } from '../../domain/game-logic/Game';
import styles from './Board.module.scss';
import { Client } from 'boardgame.io/react';
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
import { BattleEnd } from './battle-end/BattleEnd';
import { Pass } from './pass-btn/Pass';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
}): JSX.Element => {
  const { G, moves, ctx } = props;
  const playerStates = Object.values(G.players);
  return (
    <DndProvider backend={HTML5Backend}>
      <BattleEnd ctx={ctx} />
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

export const Board = Client({
  game: Game,
  board: BoardView,
  debug: true,
});

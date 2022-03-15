import { Game, GameContext, GameState, PlayerState } from '../../domain/Game';
import styles from './Board.module.scss';
import { Client } from 'boardgame.io/react';
import { Hand } from './hand/Hand';
import { BattleLine } from './battle-line/BattleLine';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ScoreBoard } from './score-board/ScoreBoard';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Record<string, (...args: any[]) => void>;
}): JSX.Element => {
  const { G, moves } = props;
  const playerStates = Object.values(G.players);
  return (
    <DndProvider debugMode={true} backend={HTML5Backend}>
      <div className={styles.Container}>
        <ScoreBoard model={playerStates} />
        {[...playerStates].reverse().map((playerState: PlayerState) => {
          return (
            <BattleLine
              key={playerState.id}
              model={playerState.battleLine}
              moves={moves}
              playerId={playerState.id}
            />
          );
        })}
        <Hand moves={moves} model={G.players['0'].hand} playerId={'0'} />
      </div>
    </DndProvider>
  );
};

export const Board = Client({
  game: Game,
  board: BoardView,
});

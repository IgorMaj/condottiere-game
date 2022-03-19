import { Game } from '../../domain/game-logic/Game';
import styles from './Board.module.scss';
import { Client } from 'boardgame.io/react';
import { Hand } from './hand/Hand';
import { BattleLine } from './battle-line/BattleLine';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ScoreBoard } from './score-board/ScoreBoard';
import { GameContext, GameState, PlayerState } from '../../domain/entity';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Record<string, (...args: any[]) => void>;
}): JSX.Element => {
  const { G, moves, ctx } = props;
  const playerStates = Object.values(G.players);

  if ((ctx as any).gameover) {
    (ctx as any).gameover.winner !== undefined
      ? alert(`Winner: ${(ctx as any).gameover.winner}`)
      : alert('Draw!');
  }

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
        <Hand
          ctx={ctx}
          moves={moves}
          model={G.players['0'].hand}
          playerId={'0'}
        />
      </div>
    </DndProvider>
  );
};

export const Board = Client({
  game: Game,
  board: BoardView,
  debug: true,
});

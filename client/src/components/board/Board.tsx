import { Game } from '../../domain/game-logic/Game';
import styles from './Board.module.scss';
import { Client } from 'boardgame.io/react';
import { Hand } from './hand/Hand';
import { BattleLine } from './battle-line/BattleLine';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ScoreBoard } from './score-board/ScoreBoard';
import { GameContext, GameState, PlayerState } from '../../domain/entity';
import { BattleEnd } from './battle-end/BattleEnd';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Record<string, (...args: any[]) => void>;
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

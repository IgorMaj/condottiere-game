import { Game, GameContext, GameState, PlayerState } from '../../domain/Game';
import styles from './Board.module.scss';
import { Client } from 'boardgame.io/react';
import { Hand } from './hand/Hand';
import { BattleLine } from './battle-line/BattleLine';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Record<string, (...args: any[]) => void>;
}): JSX.Element => {
  const { G, moves } = props;
  return (
    <DndProvider debugMode={true} backend={HTML5Backend}>
      <div className={styles.Container}>
        {Object.values(G.players)
          .reverse()
          .map((playerState: PlayerState, index: number) => {
            return (
              <BattleLine
                key={index}
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

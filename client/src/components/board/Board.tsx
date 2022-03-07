import { Game, GameContext, GameState, PlayerState } from '../../domain/Game';
import styles from './Board.module.scss';
import { Client } from 'boardgame.io/react';
import { Hand } from './hand/Hand';
import { BattleLine } from './battle-line/BattleLine';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Record<string, (...args: any[]) => void>;
}): JSX.Element => {
  const { G, moves } = props;
  return (
    <div className={styles.Container}>
      {Object.values(G.players)
        .reverse()
        .map((playerState: PlayerState, index: number) => {
          return <BattleLine key={index} model={playerState.battleLine} />;
        })}
      <Hand moves={moves} model={G.players['0'].hand} />
    </div>
  );
};

export const Board = Client({
  game: Game,
  board: BoardView,
});

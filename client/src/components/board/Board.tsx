import { Game, GameContext, GameState } from '../../domain/Game';
import { Card, ICardModel } from '../cards/Card';
import styles from './Board.module.scss';
import { Client } from 'boardgame.io/react';

const BoardView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Record<string, (...args: any[]) => void>;
}): JSX.Element => {
  const { G } = props;
  return (
    <div className={styles.Container}>
      {G.deck.map((card: ICardModel, index: number) => {
        return <Card key={index} model={card} />;
      })}
    </div>
  );
};

export const Board = Client({
  game: Game,
  board: BoardView,
});

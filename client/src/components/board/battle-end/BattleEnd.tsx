import React from 'react';
import { useAlert } from 'react-alert';
import { GameContext } from '../../../domain/entity';

// shows that the battle has concluded
export const BattleEnd = (props: { ctx: GameContext }): JSX.Element => {
  const { ctx } = props;
  const alert = useAlert();
  const gameover = (ctx as any).gameover;
  const [shownGameOver, setShowGameOver] = React.useState(false);
  React.useEffect(() => {
    if (gameover) {
      gameover.winner !== undefined
        ? alert.show(`Battle won by: ${(ctx as any).gameover.winner}!`)
        : alert.show('The battle is a draw!');
    }
  }, [shownGameOver, alert, ctx, gameover]);
  if (gameover && !shownGameOver) {
    setShowGameOver(true);
  }
  return <></>;
};

import { useDrop } from 'react-dnd';
import { ICardModel, Moves, PlayerState } from '../../../domain/entity';
import {
  getScarecrow,
  scarecrowPlayed,
} from '../../../domain/game-logic/utils';
import { MERCENARY_TYPE, SCARECROW_CLASS } from '../../../utils/constants';
import { Card } from '../../cards/Card';
import styles from './BattleLine.module.scss';

function getBorderColor(isDragging: boolean) {
  if (isDragging) return { borderColor: 'var(--selectColor)' };
  return {};
}

export const BattleLine = (props: { state: PlayerState; moves: Moves }) => {
  const { state, moves } = props;
  const playerId = state.id;
  const model = state.battleLine;

  const isSelectable = scarecrowPlayed(state);
  const scarecrow = getScarecrow(state);

  const [{ isDragging }, dropRef] = useDrop({
    accept: `player_${playerId}`,
    drop: (card: { id: string }) => {
      moves?.playCard?.(card.id);
    },
    collect: (monitor) => ({
      isDragging: monitor.canDrop(),
    }),
  });

  return (
    <div
      className={styles.Container}
      ref={dropRef}
      style={getBorderColor(isDragging)}
    >
      {model.map((card: ICardModel) => {
        return (
          <div
            key={card.id}
            onClick={() => {
              if (isSelectable && card.type === MERCENARY_TYPE) {
                moves.scarecrow(scarecrow.id, card.id);
              } else if (isSelectable && card.class === SCARECROW_CLASS) {
                moves.scarecrow(scarecrow.id);
              }
            }}
            className={
              (isSelectable && card.type === MERCENARY_TYPE) ||
              (isSelectable && card.class === SCARECROW_CLASS)
                ? styles.BattleLineCardSelectable
                : styles.BattleLineCard
            }
          >
            <Card model={card} />
          </div>
        );
      })}
    </div>
  );
};

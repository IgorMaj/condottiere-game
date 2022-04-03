import { useDrop } from 'react-dnd';
import { ICardModel, Moves, PlayerState } from '../../../domain/entity';
import {
  getScarecrow,
  scarecrowPlayed,
} from '../../../domain/game-logic/utils';
import { MERCENARY_TYPE } from '../../../utils/constants';
import { Card } from '../../cards/Card';
import styles from './BattleLine.module.scss';

function getBorderColor(isDragging: boolean, isSelectable: boolean) {
  if (isDragging) return { borderColor: 'var(--selectColor)' };
  if (isSelectable) return { borderColor: 'var(--scarecrowColor)' };
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
      onClick={(event) => {
        if (isSelectable) {
          event.stopPropagation();
          moves.scarecrow(scarecrow.id);
        }
      }}
      style={getBorderColor(isDragging, isSelectable)}
    >
      {model.map((card: ICardModel) => {
        return (
          <div
            key={card.id}
            onClick={(event) => {
              if (isSelectable && card.type === MERCENARY_TYPE) {
                event.stopPropagation();
                moves.scarecrow(scarecrow.id, card.id);
              }
            }}
            className={
              isSelectable && card.type === MERCENARY_TYPE
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

import { useDrop } from 'react-dnd';
import { ICardModel, Moves, PlayerState } from '../../../domain/entity';
import {
  getScarecrow,
  scarecrowPlayed,
} from '../../../domain/game-logic/utils';
import {
  BACK_ICON_DIM,
  MERCENARY_TYPE,
  OPACITY,
  PLAYER_COLORS,
  SCARECROW_CLASS,
} from '../../../utils/constants';
import { Card } from '../../cards/Card';
import styles from './BattleLine.module.scss';
import BACK_ICON from '../../../assets/icons/back.png';
import { showAlert } from '../../alert/alert.service';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { CardTransition } from '../../card-transition/CardTransition';

function getBorderColor(isDragging: boolean, playerId: string) {
  if (isDragging) return { borderColor: 'var(--selectColor)' };
  return { borderColor: PLAYER_COLORS[playerId] };
}

function getBackground(passed: boolean) {
  return passed ? { background: 'var(--lightgray)', opacity: OPACITY } : {};
}

export const BattleLine = (props: { state: PlayerState; moves: Moves }) => {
  const { state, moves } = props;
  const playerId = state.id;
  const model = state.battleLine;

  const { t } = useTranslation();

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

  const susceptibleToScarecrow = (card: ICardModel) => {
    return (
      (isSelectable && card.type === MERCENARY_TYPE) ||
      (isSelectable && card.class === SCARECROW_CLASS)
    );
  };

  React.useEffect(() => {
    if (state.passed) {
      showAlert(`P${state.id} ${t('Battle.passed')}`);
    }
  }, [state.passed, state.id, t]);

  return (
    <div
      className={styles.Container}
      ref={dropRef}
      style={{
        ...getBorderColor(isDragging, state.id),
        ...getBackground(state.passed),
      }}
    >
      <TransitionGroup component={null}>
        {model.map((card: ICardModel) => {
          return (
            <CardTransition key={card.id}>
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
                  susceptibleToScarecrow(card)
                    ? styles.BattleLineCardSelectable
                    : styles.BattleLineCard
                }
              >
                <Card model={card} />
                <div
                  className={
                    susceptibleToScarecrow(card)
                      ? styles.BackContainer
                      : styles.None
                  }
                >
                  <img
                    src={BACK_ICON}
                    alt={''}
                    width={BACK_ICON_DIM}
                    height={BACK_ICON_DIM}
                  />
                </div>
              </div>
            </CardTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

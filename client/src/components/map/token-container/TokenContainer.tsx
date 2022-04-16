import ReactTooltip from 'react-tooltip';
import { GameContext, GameState, Moves } from '../../../domain/entity';
import styles from './TokenContainer.module.scss';

export const TokenContainer = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
  playerId: string;
}): JSX.Element => {
  const { G, playerId } = props;
  const hasCondottiereToken = G.condottiereTokenOwnerId === playerId;
  const hasPopeToken = G.popeTokenOwnerId === playerId;
  return (
    <div className={styles.Container}>
      <div
        style={hasCondottiereToken ? { backgroundColor: 'black' } : {}}
        className={styles.Token}
        data-tip
        data-for={'condottiere-token'}
      >
        <ReactTooltip id={'condottiere-token'} place="top" effect="solid">
          Condottiere Token Slot
        </ReactTooltip>
      </div>
      <div
        style={hasPopeToken ? { backgroundColor: 'white' } : {}}
        className={styles.Token}
        data-tip
        data-for={'pope-token'}
      >
        <ReactTooltip id={'pope-token'} place="top" effect="solid">
          Pope Token Slot
        </ReactTooltip>
      </div>
    </div>
  );
};

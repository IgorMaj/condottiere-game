import ReactTooltip from 'react-tooltip';
import { GameContext, GameState, Moves } from '../../../domain/entity';
import { CONDOTTIERE_TOKEN_ID, POPE_TOKEN_ID } from '../../../utils/constants';
import styles from './TokenContainer.module.scss';

export const TokenContainer = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
  playerId: string;
  selectedTokenId: string;
  selectToken: (tokenId: string) => void;
}): JSX.Element => {
  const { G, playerId, selectedTokenId, selectToken } = props;
  const hasCondottiereToken = G.condottiereTokenOwnerId === playerId;
  const hasPopeToken = G.popeTokenOwnerId === playerId;
  const condottiereTokenSelected = CONDOTTIERE_TOKEN_ID === selectedTokenId;
  const popeTokenSelected = POPE_TOKEN_ID === selectedTokenId;

  return (
    <div className={styles.Container} onClick={() => selectToken('')}>
      <div
        className={`${styles.Token} ${
          hasCondottiereToken ? styles.CondottiereToken : ''
        } ${condottiereTokenSelected ? styles.Selected : ''}`}
        data-tip
        onClick={(e) => {
          e.stopPropagation();
          if (hasCondottiereToken) {
            selectToken(CONDOTTIERE_TOKEN_ID);
          }
        }}
        data-for={CONDOTTIERE_TOKEN_ID}
      >
        <ReactTooltip id={CONDOTTIERE_TOKEN_ID} place="top" effect="solid">
          Condottiere Token Slot
        </ReactTooltip>
      </div>
      <div
        className={`${styles.Token} ${hasPopeToken ? styles.PopeToken : ''} ${
          popeTokenSelected ? styles.Selected : ''
        }`}
        data-tip
        onClick={(e) => {
          e.stopPropagation();
          if (hasPopeToken) {
            selectToken(POPE_TOKEN_ID);
          }
        }}
        data-for={POPE_TOKEN_ID}
      >
        <ReactTooltip id={POPE_TOKEN_ID} place="top" effect="solid">
          Pope Token Slot
        </ReactTooltip>
      </div>
    </div>
  );
};

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactTooltip from "react-tooltip";
import { GameContext, GameState, Moves } from "../../../domain/entity";
import { CONDOTTIERE_TOKEN_ID, POPE_TOKEN_ID } from "../../../utils/constants";
import styles from "./TokenContainer.module.scss";

export const TokenContainer = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
  playerId: string;
  selectedTokenId: string;
  selectToken: (tokenId: string) => void;
}): JSX.Element => {
  const { t } = useTranslation();
  const { G, playerId, selectedTokenId, selectToken, ctx } = props;
  const hasCondottiereToken = G.condottiereTokenOwnerId === playerId;
  const hasPopeToken = G.popeTokenOwnerId === playerId;
  const condottiereTokenSelected = CONDOTTIERE_TOKEN_ID === selectedTokenId;
  const popeTokenSelected = POPE_TOKEN_ID === selectedTokenId;
  const isDisabled = ctx.gameover || playerId !== ctx.currentPlayer;

  useEffect(() => {
    const outsideClick = () => {
      selectToken("");
    };
    window.addEventListener("click", outsideClick);
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  }, [selectToken]);

  return (
    <div className={`${styles.Container} ${isDisabled ? styles.Disabled : ""}`}>
      <div
        className={`${styles.Token} ${
          hasCondottiereToken ? styles.CondottiereToken : ""
        } ${condottiereTokenSelected ? styles.Selected : ""}`}
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
          {t("Map.condottiereTokenSlot")}
        </ReactTooltip>
      </div>
      <div
        className={`${styles.Token} ${hasPopeToken ? styles.PopeToken : ""} ${
          popeTokenSelected ? styles.Selected : ""
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
          {t("Map.popeTokenSlot")}
        </ReactTooltip>
      </div>
    </div>
  );
};

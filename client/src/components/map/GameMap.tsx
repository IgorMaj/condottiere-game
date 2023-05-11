import React, { useCallback } from "react";
import ReactTooltip from "react-tooltip";
import { GameContext, GameState, Moves, Territory } from "../../domain/entity";
import { initMapGame } from "../../domain/game-logic/map/map-game";
import {
  CONDOTTIERE_TOKEN_ID,
  PLAYER_COLORS,
  POPE_TOKEN_ID,
  TerritoryStatus,
} from "../../utils/constants";
import styles from "./GameMap.module.scss";
import { TokenContainer } from "./token-container/TokenContainer";
import { Client } from "boardgame.io/react";
import { validGameState } from "../../utils/methods";
import { generateBots } from "../../domain/game-logic/utils";
import { showAlert } from "../../utils/alert/alert.service";
import { toBattle } from "../../utils/navigation";
import { Local } from "boardgame.io/multiplayer";
import { MapLegend } from "./map-legend/MapLegend";
import { useTranslation } from "react-i18next";
import { GameConfig } from "../../utils/game-config";
import { useNavigate } from "react-router-dom";
import { MapBot } from "../../domain/game-logic/ai/map";
import { gameEndMessage, historyState } from "../../utils/client";
import Button from "../ui/button/Button";

const calculatePointStatus = (point: Territory, selectedTokenId: string) => {
  if (
    point.status === TerritoryStatus.FREE &&
    selectedTokenId === CONDOTTIERE_TOKEN_ID
  ) {
    return styles.CondottierePoint;
  }

  if (point.status === TerritoryStatus.BATTLE) {
    return styles.BattlePoint;
  }

  if (
    point.status === TerritoryStatus.FREE &&
    selectedTokenId === POPE_TOKEN_ID
  ) {
    return styles.PopePoint;
  }

  if (point.status === TerritoryStatus.POPE) {
    return styles.PopeProtectionPoint;
  }

  return "";
};

const takenPointStyle = (point: Territory) => {
  return point.owner
    ? {
        border: `2px solid ${PLAYER_COLORS[`${point.owner}`]}`,
        backgroundColor: `${PLAYER_COLORS[`${point.owner}`]}`,
      }
    : {};
};

const GameMapView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
  playerID: string;
  callback?: () => void;
}): JSX.Element => {
  const {
    G,
    G: { territories },
    moves,
    ctx,
    playerID,
    callback,
  } = props;
  const { t } = useTranslation();
  const [selectedTokenId, setToken] = React.useState("");
  React.useEffect(() => {
    if (!G.condottiereTokenOwnerId) {
      showAlert(t("Map.territoryMarked"));
      callback?.();
    }
  }, [G.condottiereTokenOwnerId, G, t, callback]);

  React.useEffect(() => {
    if (ctx.gameover) {
      return showAlert(gameEndMessage(ctx));
    }
  }, [ctx.gameover, ctx]);
  return (
    <div className={styles.Container}>
      <div className={styles.MapContainer}>
        {territories.map((point: Territory, index: number) => {
          return (
            <div key={index} className={styles.PointContainer}>
              <div
                onClick={() => {
                  if (
                    point.status === TerritoryStatus.FREE &&
                    selectedTokenId
                  ) {
                    moves.setTokenOnTerritory(point.name, selectedTokenId);
                    setToken("");
                  }
                }}
                data-tip
                data-for={`${point.name}Tip`}
                className={`${styles.Point} ${calculatePointStatus(
                  point,
                  selectedTokenId
                )}`}
                style={{
                  top: point.top,
                  left: point.left,
                  ...takenPointStyle(point),
                }}
              ></div>
              <ReactTooltip id={`${point.name}Tip`} place="top" effect="solid">
                {point.name} {point.owner ? `(Player ${point.owner})` : ""}
              </ReactTooltip>
            </div>
          );
        })}
        <MapLegend G={G} ctx={ctx} />
      </div>
      <div className={styles.OuterTokenContainer}>
        <TokenContainer
          selectedTokenId={selectedTokenId}
          selectToken={setToken}
          ctx={ctx}
          G={G}
          moves={moves}
          playerId={playerID}
        />
      </div>
    </div>
  );
};

export const SinglePlayerMapView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
}): JSX.Element => {
  const toBattleCallback = useCallback(() => {
    toBattle(props.G);
  }, [props.G]);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const backToMenu = () => {
    GameConfig.reset();
    navigate("/", { replace: true, state: null });
  };

  return (
    <>
      <GameMapView {...props} playerID={"0"} callback={toBattleCallback} />
      <div className={styles.BackToMenuContainer}>
        <Button label={t("Common.backToMenu")} onClick={backToMenu} />
      </div>
    </>
  );
};

export const MultiplayerPlayerMapView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
  playerID: string;
}): JSX.Element => {
  return <GameMapView {...props} playerID={props.playerID} />;
};

export const GameMap = () => {
  // we extract the user state from here
  // (we use the history object to send the state to different games)
  const state = historyState();
  return Client({
    game: initMapGame(validGameState(state) ? state : undefined),
    board: SinglePlayerMapView,
    debug: false,
    multiplayer: Local({
      bots: generateBots(MapBot, GameConfig.NUM_BOTS),
    }),
    numPlayers: GameConfig.NUM_PLAYERS,
  });
};

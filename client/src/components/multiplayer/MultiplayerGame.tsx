import { useEffect, useState } from "react";
import { GameContext, GameState, Moves } from "../../domain/entity";
import {
  BATTLE_PHASE,
  DELAYED_ACTION_TIMEOUT,
  KEEP_CARDS_PHASE,
  MAP_PHASE,
} from "../../utils/constants";
import { MultiplayerBoardView } from "../board/Board";
import { MultiplayerPlayerMapView } from "../map/GameMap";

export const MultiplayerGameView = (props: {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
  playerID: string;
}) => {
  const [currentPhase, setCurrentPhase] = useState(props.ctx.phase);
  useEffect(() => {
    setTimeout(() => {
      setCurrentPhase(props.ctx.phase);
    }, DELAYED_ACTION_TIMEOUT);
  }, [props.ctx.phase]);

  return (
    <>
      {[BATTLE_PHASE, KEEP_CARDS_PHASE].includes(currentPhase) && (
        <MultiplayerBoardView {...props} />
      )}
      {(currentPhase === MAP_PHASE || !currentPhase) && (
        <MultiplayerPlayerMapView {...props} />
      )}
    </>
  );
};

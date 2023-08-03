import { useEffect, useState } from "react";
import { GameContext, GameState, Moves } from "../../domain/entity";
import {
  BATTLE_PHASE,
  DELAYED_ACTION_TIMEOUT,
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
      {currentPhase === BATTLE_PHASE && <MultiplayerBoardView {...props} />}
      {(currentPhase === MAP_PHASE || !currentPhase) && (
        <MultiplayerPlayerMapView {...props} />
      )}
    </>
  );
};

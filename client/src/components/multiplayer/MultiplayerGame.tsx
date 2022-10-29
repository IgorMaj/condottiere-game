import { useEffect, useState } from 'react';
import { GameContext, GameState, Moves } from '../../domain/entity';
import { DELAYED_ACTION_TIMEOUT } from '../../utils/constants';
import { MultiplayerBoardView } from '../board/Board';
import { MultiplayerPlayerMapView } from '../map/GameMap';

const BATTLE_PHASE = 'battle';
const MAP_PHASE = 'map';

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

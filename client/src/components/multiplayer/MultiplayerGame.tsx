import { GameContext, GameState, Moves } from '../../domain/entity';
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
  return (
    <>
      {props.ctx.phase === BATTLE_PHASE && <MultiplayerBoardView {...props} />}
      {(props.ctx.phase === MAP_PHASE || !props.ctx.phase) && (
        <MultiplayerPlayerMapView {...props} />
      )}
    </>
  );
};

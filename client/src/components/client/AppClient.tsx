import { Route, Routes, useNavigate } from 'react-router-dom';
import { registerNavigate } from '../../utils/navigation';
import { GameMap } from '../map/GameMap';
import { Board } from '../board/Board';

export const AppClient = (): JSX.Element => {
  const navigate = useNavigate();
  registerNavigate(navigate);
  return (
    <Routes>
      <Route
        path="/"
        element={(() => {
          const GameMapComponent = GameMap();
          return <GameMapComponent />;
        })()}
      />
      <Route
        path="battle"
        element={(() => {
          const BoardComponent = Board();
          return <BoardComponent />;
        })()}
      />
    </Routes>
  );
};

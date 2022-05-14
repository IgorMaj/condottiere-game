import { Route, Routes, useNavigate } from 'react-router-dom';
import { registerNavigate } from '../../utils/navigation';
import { GameMap } from '../map/GameMap';
import { Board } from '../board/Board';
import { MainMenu } from '../main-menu/MainMenu';

export const AppClient = (): JSX.Element => {
  const navigate = useNavigate();
  registerNavigate(navigate);
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route
        path="/map"
        element={(() => {
          const GameMapComponent = GameMap();
          return <GameMapComponent playerID="0" />;
        })()}
      />
      <Route
        path="/battle"
        element={(() => {
          const BoardComponent = Board();
          return <BoardComponent playerID="0" />;
        })()}
      />
    </Routes>
  );
};

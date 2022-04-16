import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AlertView } from './components/alert/AlertView';
import { Board } from './components/board/Board';
import { GameMap } from './components/map/GameMap';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameMap />} />
          <Route path="battle" element={<Board />} />
        </Routes>
      </BrowserRouter>
      <AlertView />
    </>
  );
}

export default App;

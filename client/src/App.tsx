import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Board } from './components/board/Board';
import { GameMap } from './components/map/GameMap';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameMap />} />
        <Route path="battle" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

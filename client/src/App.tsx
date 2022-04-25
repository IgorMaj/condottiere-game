import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AlertView } from './components/alert/AlertView';
import { AppClient } from './components/client/AppClient';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppClient />
      </BrowserRouter>
      <AlertView />
    </>
  );
}

export default App;

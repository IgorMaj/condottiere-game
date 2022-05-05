import { HashRouter } from 'react-router-dom';
import './App.css';
import { AlertView } from './components/alert/AlertView';
import { AppClient } from './components/client/AppClient';

function App() {
  return (
    <>
      <HashRouter>
        <AppClient />
      </HashRouter>
      <AlertView />
    </>
  );
}

export default App;

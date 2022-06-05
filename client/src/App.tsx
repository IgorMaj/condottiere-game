import { HashRouter } from 'react-router-dom';
import './App.css';
import { AppClient } from './components/client/AppClient';
import './i18n';

function App() {
  return (
    <>
      <HashRouter>
        <AppClient />
      </HashRouter>
    </>
  );
}

export default App;

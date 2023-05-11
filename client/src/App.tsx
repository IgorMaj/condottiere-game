import { HashRouter } from "react-router-dom";
import "./App.css";
import { AppClient } from "./components/client/AppClient";
import { Preloader } from "./components/preloader/Preloader";
import "./i18n";

function App() {
  return (
    <>
      <HashRouter>
        <Preloader>
          <AppClient />
        </Preloader>
      </HashRouter>
    </>
  );
}

export default App;

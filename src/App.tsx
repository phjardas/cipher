import { useEffect } from "react";
import Info from "./Info";
import Inputs from "./Inputs";
import { useGame } from "./game";
import { useMediaQuery } from "./useMediaQuery";

export default function App() {
  const [game, dispatch] = useGame();
  useColorMode();

  return (
    <div className="container pt-4">
      <div className="row">
        <h1 className="display-3 col-12 mb-3">Cipher</h1>
        <main className="col-12 col-md-8 col-lg-9 mb-5">
          <Inputs game={game} dispatch={dispatch} />
        </main>
        <aside className="col mb-5">
          <Info game={game} dispatch={dispatch} />
        </aside>
      </div>
    </div>
  );
}

function useColorMode() {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    const [html] = window.document.getElementsByTagName("html");
    if (html) {
      html.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);
}

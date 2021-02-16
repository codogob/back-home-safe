import React, { useState, useMemo, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import { Welcome } from "./containers/Welcome";
import { Confirm } from "./containers/Confirm";
import { QR } from "./containers/QR";
import { PWAPrompt } from "./components/PWAPrompt";
import { disableBodyScroll } from "body-scroll-lock";

function App() {
  const [place, setPlace] = useState("");

  const isPWA = useMemo(
    () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      window.location.hostname === "localhost",
    []
  );

  useEffect(() => {
    const root = document.querySelector("#root");
    if (!root) return;
    disableBodyScroll(root);
  }, []);

  return (
    <>
      <GlobalStyle />
      {isPWA ? (
        <HashRouter basename="/">
          <Switch>
            <Route exact path="/">
              <Welcome place={place} setPlace={setPlace} />
            </Route>
            <Route exact path="/qr">
              <QR setPlace={setPlace} />
            </Route>
            <Route exact path="/confirm">
              <Confirm place={place} />
            </Route>
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      ) : (
        <PWAPrompt />
      )}
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
html {
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:#12b188;
  width: 100%;
  height: 100%;
}


#root {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}
`;

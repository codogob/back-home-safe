import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import { Welcome } from "./containers/Welcome";
import { Confirm } from "./containers/Confirm";
import { QR } from "./containers/QR";
import { PWAPrompt } from "./components/PWAPrompt";
import { disableBodyScroll } from "body-scroll-lock";
import adapter from "webrtc-adapter";

function App() {
  const [isPWA, setPWA] = useState(false);

  useEffect(() => {
    setPWA(
      window.matchMedia("(display-mode: standalone)").matches ||
        /\bmode=standalone\b/.test(window.location.hash) ||
        window.location.hostname === "localhost"
    );
    console.log(adapter.browserDetails.browser, adapter.browserDetails.version);
  }, []);

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
              <Welcome />
            </Route>
            <Route exact path="/qr">
              <QR />
            </Route>
            <Route exact path="/confirm">
              <Confirm />
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

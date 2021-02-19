import React, { useState, useEffect, useCallback } from "react";
import { createGlobalStyle } from "styled-components";

import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import { Welcome } from "./containers/Welcome";
import { Confirm } from "./containers/Confirm";
import { QRReader } from "./containers/QRReader";
import { PWAPrompt, PWAUpdatePrompt } from "./components/PWAPrompt";
import { disableBodyScroll } from "body-scroll-lock";
import adapter from "webrtc-adapter";
import { QRGenerator } from "./containers/QRGeneartor";
import { checkPwaInstalled } from "./utils/app-check";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

interface PWAReloadPromptState {
  show: boolean;
  version?: string;
  skipWaiting: () => void;
};

const defaultPWAReloadPromptState : PWAReloadPromptState = {
  show: false,
  version: undefined,
  skipWaiting: () => {}
};

function App() {
  const [showPWAPrompt, setShowPWAPrompt] = useState(!checkPwaInstalled());
  const [statePWAReloadPrompt, setStatePWAReloadPrompt] = useState(defaultPWAReloadPromptState);
  const registerSW = useCallback(
    () => {
      serviceWorkerRegistration.register({
        onUpdate: (registration, skipWaiting, installingWorker) => {
          setStatePWAReloadPrompt({
            show: true,
            version: undefined,
            skipWaiting
          });
        }
      });
    },
    [setStatePWAReloadPrompt]
  );
  const dismisePWAReload = useCallback(
    () => {
      setStatePWAReloadPrompt(defaultPWAReloadPromptState);
    },
    [setStatePWAReloadPrompt]
  );
  useEffect(registerSW, [registerSW]);
  useEffect(() => {
    console.log(adapter.browserDetails.browser, adapter.browserDetails.version);
  }, []);

  useEffect(() => {
    const root = document.querySelector("#root");
    if (!root) return;
    disableBodyScroll(root);
  }, []);
  let content : React.ReactNode;
  if (showPWAPrompt) {
    content = (
      <PWAPrompt
          onDismiss={() => {
            setShowPWAPrompt(false);
          }}
        />
    )
  } else if (statePWAReloadPrompt.show) {
    content = (
      <PWAUpdatePrompt
        skipWaiting={statePWAReloadPrompt.skipWaiting}
        onDismiss={dismisePWAReload}/>
    ) 
  } else {
    content = (
      <HashRouter basename="/">
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/qrReader111">
              <QRReader />
            </Route>
            <Route exact path="/qrGenerator">
              <QRGenerator />
            </Route>
            <Route exact path="/confirm">
              <Confirm />
            </Route>
            <Redirect to="/" />
          </Switch>
        </HashRouter>
    )
  }
  return (
    <>
      <GlobalStyle />
      {content}
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
  font-family: Noto Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:#12b188;
  width: 100%;
  height: 100%;
}

textarea{
  font-family: Noto Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}


#root {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}
`;

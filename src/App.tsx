import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

import { Route, HashRouter, Redirect } from "react-router-dom";
import { Welcome } from "./containers/Welcome";
import { Confirm } from "./containers/Confirm";
import { QRReader } from "./containers/QRReader";
import { PWAPrompt } from "./components/PWAPrompt";
import { disableBodyScroll } from "body-scroll-lock";
import adapter from "webrtc-adapter";
import { QRGenerator } from "./containers/QRGeneartor";
import { checkPwaInstalled } from "./utils/appCheck";
import { AnimatedSwitch } from "./components/AnimatedSwitch";
import { CameraSetting } from "./containers/CameraSetting";
import { hasCameraSupport } from "./constants/cameraSupport";
import { UseCameraProvider } from "./hooks/useCamera";

function App() {
  const [showPWAPrompt, setShowPWAPrompt] = useState(!checkPwaInstalled());

  useEffect(() => {
    console.log(adapter.browserDetails.browser, adapter.browserDetails.version);
  }, []);

  useEffect(() => {
    const root = document.querySelector("#root");
    if (!root) return;
    disableBodyScroll(root);
  }, []);

  return (
    <UseCameraProvider>
      <GlobalStyle />
      {showPWAPrompt ? (
        <PWAPrompt
          onDismiss={() => {
            setShowPWAPrompt(false);
          }}
        />
      ) : (
        <HashRouter basename="/">
          <AnimatedSwitch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/qrGenerator">
              <QRGenerator />
            </Route>
            <Route exact path="/confirm">
              <Confirm />
            </Route>
            {hasCameraSupport && (
              <Route exact path="/qrReader">
                <QRReader />
              </Route>
            )}
            {hasCameraSupport && (
              <Route exact path="/cameraSetting">
                <CameraSetting />
              </Route>
            )}
            <Redirect to="/" />
          </AnimatedSwitch>
        </HashRouter>
      )}
    </UseCameraProvider>
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
  font-family: Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:#12b188;
  width: 100%;
  height: 100%;
}

textarea {
  font-family: inherit;
}


#root {
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
}
`;

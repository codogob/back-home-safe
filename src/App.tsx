import React, { useState, useEffect, lazy, Suspense } from "react";
import { createGlobalStyle } from "styled-components";
import { LinearProgress } from "@material-ui/core";
import { Route, HashRouter, Redirect } from "react-router-dom";
import { disableBodyScroll } from "body-scroll-lock";

import { PWAPrompt } from "./components/PWAPrompt";
import adapter from "webrtc-adapter";
import { checkPwaInstalled } from "./utils/appCheck";
import { AnimatedSwitch } from "./components/AnimatedSwitch";
import { useCamera } from "./hooks/useCamera";
import Welcome from "./containers/Welcome";
import Confirm from "./containers/Confirm";
import QRReader from "./containers/QRReader";
import CameraSetting from "./containers/CameraSetting";

const QRGenerator = lazy(() => import("./containers/QRGeneartor"));

function App() {
  const { hasCameraSupport } = useCamera();
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
    <>
      <GlobalStyle />
      {showPWAPrompt ? (
        <PWAPrompt
          onDismiss={() => {
            setShowPWAPrompt(false);
          }}
        />
      ) : (
        <HashRouter basename="/">
          <Suspense fallback={<LinearProgress />}>
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
                <>
                  <Route exact path="/qrReader">
                    <QRReader />
                  </Route>
                  <Route exact path="/cameraSetting">
                    <CameraSetting />
                  </Route>
                </>
              )}
              <Redirect to="/" />
            </AnimatedSwitch>
          </Suspense>
        </HashRouter>
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

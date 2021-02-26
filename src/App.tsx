import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";

import { Route, HashRouter, Redirect } from "react-router-dom";
import { Welcome } from "./containers/Welcome";
import { Confirm } from "./containers/Confirm";
import { QRReader } from "./containers/QRReader";
import adapter from "webrtc-adapter";
import { QRGenerator } from "./containers/QRGeneartor";
import { AnimatedSwitch } from "./components/AnimatedSwitch";
import { CameraSetting } from "./containers/CameraSetting";
import { useCamera } from "./hooks/useCamera";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Tutorial } from "./containers/Tutorial";

function App() {
  const { hasCameraSupport } = useCamera();
  const { finishedTutorial } = useLocalStorage();

  useEffect(() => {
    console.log(adapter.browserDetails.browser, adapter.browserDetails.version);
  }, []);

  return (
    <>
      <GlobalStyle />
      <HashRouter basename="/">
        <AnimatedSwitch>
          {!finishedTutorial && (
            <Route exact path="/tutorial">
              <Tutorial />
            </Route>
          )}
          {!finishedTutorial && <Redirect to="/tutorial" />}
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

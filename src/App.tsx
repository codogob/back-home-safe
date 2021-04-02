import React, { Suspense, useCallback, useEffect } from "react";
import { createGlobalStyle } from "styled-components";

import { Route, HashRouter, Redirect, useLocation } from "react-router-dom";
import { Confirm } from "./containers/Confirm";
import adapter from "webrtc-adapter";
import { AnimatedSwitch } from "./components/AnimatedSwitch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { PageLoading } from "./components/PageLoading";

const QRGenerator = React.lazy(() => import("./containers/QRGenerator"));
const QRReader = React.lazy(() => import("./containers/QRReader"));
const CameraSetting = React.lazy(() => import("./containers/CameraSetting"));
const Tutorial = React.lazy(() => import("./containers/Tutorial"));
const Main = React.lazy(() => import("./containers/Main"));
const Disclaimer = React.lazy(() => import("./containers/Disclaimer"));
const Login = React.lazy(() => import("./containers/Login"));

export const App = () => {
  const { finishedTutorial, unlocked, logout } = useLocalStorage();
  const { pathname } = useLocation();

  const handleBlur = useCallback(() => {
    console.log(pathname);
    if (pathname !== "/qrReader" && pathname !== "/cameraSetting") logout();
  }, [logout, pathname]);

  useEffect(() => {
    console.log(adapter.browserDetails.browser, adapter.browserDetails.version);

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [handleBlur]);

  return (
    <Suspense fallback={<PageLoading />}>
      <GlobalStyle />
      <AnimatedSwitch>
        {!unlocked && (
          <Route exact path="/login">
            <Login />
          </Route>
        )}
        {!unlocked && <Redirect to="/login" />}
        {!finishedTutorial && (
          <Route exact path="/tutorial">
            <Tutorial />
          </Route>
        )}
        {!finishedTutorial && <Redirect to="/tutorial" />}
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/confirm">
          {/* Don't split, to provide smooth transition between QR and confirm */}
          <Confirm />
        </Route>
        <Route exact path="/qrGenerator">
          <QRGenerator />
        </Route>
        <Route exact path="/disclaimer">
          <Disclaimer />
        </Route>
        <Route exact path="/qrReader">
          <QRReader />
        </Route>
        <Route exact path="/cameraSetting">
          <CameraSetting />
        </Route>
        <Redirect to="/" />
      </AnimatedSwitch>
    </Suspense>
  );
};

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

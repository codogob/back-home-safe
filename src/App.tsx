import React, { Suspense, useCallback, useEffect, useMemo } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useLocalStorage } from "react-use";
import { createGlobalStyle } from "styled-components";
import adapter from "webrtc-adapter";

import { PageLoading } from "./components/PageLoading";
import { Confirm } from "./containers/Confirm";
import { useTravelRecord } from "./hooks/useTravelRecord";

const QRGenerator = React.lazy(() => import("./containers/QRGenerator"));
const QRReader = React.lazy(() => import("./containers/QRReader"));
const CameraSetting = React.lazy(() => import("./containers/CameraSetting"));
const Tutorial = React.lazy(() => import("./containers/Tutorial"));
const MainScreen = React.lazy(() => import("./containers/MainScreen"));
const Disclaimer = React.lazy(() => import("./containers/Disclaimer"));
const Login = React.lazy(() => import("./containers/Login"));
const ConfirmPageSetting = React.lazy(
  () => import("./containers/ConfirmPageSetting")
);

export const App = () => {
  const [finishedTutorial, setFinishedTutorial] = useLocalStorage(
    "finished_tutorial",
    false
  );
  const [confirmPageIcon, setConfirmPageIcon] = useLocalStorage<string | null>(
    "confirmPageIcon",
    null
  );
  const { lockTravelRecord, unlocked, currentTravelRecord } = useTravelRecord();
  const { pathname } = useLocation();

  const handleBlur = useCallback(() => {
    console.log(pathname);
    if (pathname !== "/qrReader" && pathname !== "/cameraSetting")
      lockTravelRecord();
  }, [lockTravelRecord, pathname]);

  useEffect(() => {
    console.log(adapter.browserDetails.browser, adapter.browserDetails.version);

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [handleBlur]);

  const pageMap = useMemo<{ route: RouteProps; component: React.ReactNode }[]>(
    () => [
      {
        route: {
          exact: true,
          path: "/",
        },
        component: <MainScreen />,
      },
      {
        route: {
          exact: true,
          path: "/confirm",
        },
        component: (
          <Confirm
            confirmPageIcon={confirmPageIcon}
            currentTravelRecord={currentTravelRecord}
          />
        ),
      },
      {
        route: {
          exact: true,
          path: "/qrGenerator",
        },
        component: <QRGenerator />,
      },
      {
        route: {
          exact: true,
          path: "/disclaimer",
        },
        component: <Disclaimer />,
      },
      {
        route: {
          exact: true,
          path: "/qrReader",
        },
        component: <QRReader />,
      },
      {
        route: {
          exact: true,
          path: "/cameraSetting",
        },
        component: <CameraSetting />,
      },
      {
        route: {
          exact: true,
          path: "/confirmPageSetting",
        },
        component: (
          <ConfirmPageSetting
            confirmPageIcon={confirmPageIcon}
            setConfirmPageIcon={setConfirmPageIcon}
          />
        ),
      },
    ],
    [confirmPageIcon, currentTravelRecord, setConfirmPageIcon]
  );

  return (
    <>
      <GlobalStyle />
      {!unlocked && (
        <Route exact path="/login">
          <Login />
        </Route>
      )}
      {!unlocked && <Redirect to="/login" />}
      {!finishedTutorial && (
        <Route exact path="/tutorial">
          <Tutorial setFinishedTutorial={setFinishedTutorial} />
        </Route>
      )}
      {!finishedTutorial && <Redirect to="/tutorial" />}
      {pageMap.map(({ route, component }) => (
        <Route {...route} key={String(route.path)}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <div className="page">
                <Suspense fallback={<PageLoading />}>{component}</Suspense>
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
      <Redirect to="/" />
    </>
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
  position: relative;
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

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #12b188;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.8);
}

.page-enter {
  opacity: 0;
  left: 100vw;
  z-index: 1;
}

.page-enter-active {
  opacity: 1;
  left: 0vw;
  z-index: 0;
  transition: left 300ms cubic-bezier(0.25, 1, 0.5, 1);
}

.page-exit {
  opacity: 1;
  z-index: 0;
  transform: scale(1);
}

.page-exit-active {
  opacity: 0;
  z-index: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
}
`;

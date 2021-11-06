import "./locales";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { teal, yellow } from "@material-ui/core/colors";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import { App } from "./App";
import { UseBookmarkLocationProvider } from "./hooks/useBookmark";
import { UseCameraProvider } from "./hooks/useCamera";
import { UseDataProvider } from "./hooks/useData";
import { UseI18nProvider } from "./hooks/useI18n";
import { UseTimeProvider } from "./hooks/useTime";
import { UseTravelRecordProvider } from "./hooks/useTravelRecord";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const theme = createMuiTheme({
  palette: {
    primary: { main: teal[500] },
    secondary: { main: yellow[600] },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <UseI18nProvider>
      <HashRouter basename="/">
        <ThemeProvider theme={theme}>
          <UseTimeProvider>
            <UseDataProvider>
              <UseTravelRecordProvider>
                <UseBookmarkLocationProvider>
                  <UseCameraProvider>
                    <App />
                  </UseCameraProvider>
                </UseBookmarkLocationProvider>
              </UseTravelRecordProvider>
            </UseDataProvider>
          </UseTimeProvider>
        </ThemeProvider>
      </HashRouter>
    </UseI18nProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: () => {
    const shouldReload = window.confirm("已有新版本, 請完全關閉後重新開啟");
    shouldReload && window.location.reload();
  },
});

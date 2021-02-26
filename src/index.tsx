import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { teal, yellow } from "@material-ui/core/colors";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { UseCameraProvider } from "./hooks/useCamera";
import { UseLocalStorageProvider } from "./hooks/useLocalStorage";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const theme = createMuiTheme({
  palette: {
    primary: { main: teal[500] },
    secondary: { main: yellow[600] },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UseLocalStorageProvider>
        <UseCameraProvider>
          <App />
        </UseCameraProvider>
      </UseLocalStorageProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: () => {
    const shouldReload = window.confirm("已有新版本, 按確定重新載入頁面");
    shouldReload && window.location.reload();
  },
});

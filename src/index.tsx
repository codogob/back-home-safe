import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UseCameraProvider } from "./hooks/useCamera";
import { UseLocalStorageProvider } from "./hooks/usePreference";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <UseLocalStorageProvider>
      <UseCameraProvider>
        <App />
      </UseCameraProvider>
    </UseLocalStorageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

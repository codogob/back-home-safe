import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

import { Route, HashRouter, Switch, Redirect } from "react-router-dom";
import { Welcome } from "./containers/Welcome";
import { Confirm } from "./containers/Confirm";
import { QR } from "./containers/QR";

function App() {
  const [place, setPlace] = useState("");

  return (
    <>
      <GlobalStyle />
      <HashRouter basename="/">
        <Switch>
          <Route exact path="/">
            <Welcome place={place} setPlace={setPlace} />
          </Route>
          <Route exact path="/qr">
            <QR setPlace={setPlace} />
          </Route>
          <Route exact path="/confirm">
            <Confirm place={place} />
          </Route>
          <Redirect to="/" />
        </Switch>
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

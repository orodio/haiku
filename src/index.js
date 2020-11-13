import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { Root } from "./pages/root.page";
import { Profile } from "./pages/profile.page";
import { About } from "./pages/about.page";
import { Settings } from "./pages/settings.page";

window.fcl = fcl;
window.t = t;
window.authz = fcl.currentUser().authorization;

fcl
  .config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("challenge.handshake", "https://fcl-discovery.vercel.app/testnet/authn")
  // .put("persistSession", false)
  .put("Contract.Profile", "0x1d007d755706c469")
  .put("Contract.Connections", "0x7ed3a3ff81329797")
  .put("Contract.Status", "0xeaa6b8d739b99c4d");

const GlobalStyle = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    outline:none;
    border:none;
    text-decoration:none;
  }

  :root {
    --fg: #233445;
    --bg: #ffffff;
    --wow: #6600ff;
    --font-family: MonoLisa, "JetBrains Mono", "Fira Code", monospace;
    --font-size: 13px;
  }

  html, body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-family);
    font-variant-ligatures: common-ligatures;
    font-size: var(--font-size);
    letter-spacing: 0.1em;
  }

  ::selection {
    background: var(--fg);
    color: var(--bg);
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route exact path="/0x:address" component={Profile} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/about" component={About} />
        <Route exact path="/" component={Root} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

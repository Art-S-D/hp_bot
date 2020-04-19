import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, Inventory, Cards, LoginPage, Stats } from "./pages";
const env = require("./env");

function App() {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    document.title = "Jdr";
    if (!player) {
      fetch("/player", { method: "GET" })
        .catch((e) => console.log(e))
        .then((x) => x.status === 200 && x.json().then((p) => setPlayer(p)));
    }
  });

  function MainPage() {
    if (!player) return <LoginPage />;
    return (
      <Router className="App">
        <div id="navigation">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/cards">
            Cartes
          </Link>
          <Link className="nav-link" to="/inventory">
            Inventaire
          </Link>
          <Link className="nav-link" to="/stats">
            Stats
          </Link>
        </div>
        <div id="page-content">
          {player && (
            <Switch>
              <Route path="/cards">
                <Cards player={player} />
              </Route>
              <Route path="/inventory">
                <Inventory player={player} />
              </Route>
              <Route path="/stats">
                <Stats player={player} />
              </Route>
              <Route path="/">
                <Home player={player} />
              </Route>
            </Switch>
          )}
        </div>
      </Router>
    );
  }
  return (
    <div id="scroll">
      <title>Jdr</title>
      <img id="scroll-image" src="/scroll.png" alt="scroll" />
      <div id="scroll-content">
        <MainPage />
      </div>
    </div>
  );
}

export default App;

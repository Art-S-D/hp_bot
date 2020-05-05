import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, Inventory, Cards, LoginPage, Stats, Pnjs } from "./pages";
const env = require("./env");

function MainPage({ player, isAdmin }) {
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
        {/*<Link className="nav-link" to="/stats">
          Stats
  </Link>*/}
        <Link className="nav-link" to="/pnjs">
          Pnjs
        </Link>
        <Link
          onClick={() =>
            fetch(`/api/logout`, {
              method: "POST",
            }).then(window.location.reload())
          }
          className="nav-link"
          id="logout"
          to="/"
        >
          Disconnect
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
            {/*<Route path="/stats">
              <Stats player={player} />
        </Route>*/}
            <Route path="/pnjs">
              <Pnjs isAdmin={isAdmin} />
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

function App() {
  const [requiredUser, setRequiredUser] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    document.title = "Jdr";

    fetch(`/api/user${requiredUser ? `?player=${requiredUser}` : ""}`, {
      method: "GET",
    })
      .catch((e) => console.error(e))
      .then(
        (x) =>
          x.status === 200 &&
          x.json().then((p) => {
            setPlayer(p.player);
            setAdmin(p.isAdmin);
          })
      );
  }, [requiredUser]);

  return (
    <div id="scroll">
      <title>Jdr</title>
      <img id="scroll-image" src="/scroll.png" alt="scroll" />
      <div id="scroll-content">
        {isAdmin ? (
          <>
            <li id="admin-menu">
              <ul className="admin-list-item">
                <button
                  href="/"
                  className="admin-button"
                  onClick={() => {
                    setRequiredUser("Frank Fizeman");
                  }}
                >
                  Frank
                </button>
              </ul>
              <ul className="admin-list-item">
                <button
                  href="/"
                  className="admin-button"
                  onClick={() => {
                    setRequiredUser("Zango le Deuzo");
                  }}
                >
                  Zango
                </button>
              </ul>
              <ul className="admin-list-item">
                <button
                  href="/"
                  className="admin-button"
                  onClick={() => {
                    setRequiredUser("Nircosia Verpey");
                  }}
                >
                  Nico
                </button>
              </ul>
            </li>
            {player && <MainPage player={player} isAdmin={isAdmin} />}
          </>
        ) : (
          <MainPage player={player} isAdmin={isAdmin} />
        )}
      </div>
    </div>
  );
}

export default App;

import React from "react";
import "./home.css";
import MagicCircle from "../../components/magic-circle";

function Home({ player, ...props }) {
  return (
    <div id="home">
      <span id="home-magic-circle">
        <MagicCircle player={player} />
      </span>
    </div>
  );
}

export default Home;

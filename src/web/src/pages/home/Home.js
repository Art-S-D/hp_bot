import React from "react";
import "./home.css";
import MagicCircle from "../../components/magic-circle";
import DiceArea from "../../components/DiceArea";

function Home({ player, ...props }) {
  return (
    <div id="home">
      <div id="home-magic-circle">
        <MagicCircle player={player} />
      </div>
      <div id="home-dice-area">
        <DiceArea />
      </div>
    </div>
  );
}

export default Home;

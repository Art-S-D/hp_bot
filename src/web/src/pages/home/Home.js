import React, { useState } from "react";
import "./home.css";
import MagicCircle from "../../components/magic-circle";
import DiceArea from "../../components/DiceArea";
import { getAutoReroll } from "discord_bot/utils/autoReroll";

function Home({ player, ...props }) {
  const [statSelection, setStateSelection] = useState(null);
  const [competenceSelection, setCompetenceSelection] = useState(null);
  const reroll =
    statSelection &&
    competenceSelection &&
    getAutoReroll(statSelection, competenceSelection);

  return (
    <div id="home">
      <div id="home-magic-circle">
        <MagicCircle
          player={player}
          setStateSelection={setStateSelection}
          setCompetenceSelection={setCompetenceSelection}
        />
      </div>
      <div id="home-dice-area">
        <DiceArea
          statSelection={statSelection}
          competenceSelection={competenceSelection}
          reroll={reroll}
        />
      </div>
    </div>
  );
}

export default Home;

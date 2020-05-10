import React, { useState } from "react";
import "./home.css";
import MagicCircle from "../../components/magic-circle";
import DiceArea from "../../components/DiceArea";

function Home({ player, ...props }) {
  const [bonus1, setBonus1] = useState(null);
  const [bonus2, setBonus2] = useState(null);
  const [reroll, setReroll] = useState(null);
  const [bonusSelection, setBonusSelection] = useState(null);

  function handleBonusChange(v) {
    if (bonusSelection) {
      if (bonusSelection === "bonus1") setBonus1(v);
      if (bonusSelection === "bonus2") setBonus2(v);
      if (bonusSelection === "reroll") setReroll(v);
      setBonusSelection(null);
    }
  }

  return (
    <div id="home">
      <div id="home-magic-circle">
        <MagicCircle player={player} setBonus={handleBonusChange} />
      </div>
      <div id="home-dice-area">
        <DiceArea
          bonus1={bonus1}
          bonus2={bonus2}
          reroll={reroll}
          setBonusSelection={setBonusSelection}
        />
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import { ReactComponent as MagicCircleImg } from "./magic-circle.svg";
import "./magic-circle.css";

const stats_positions = {
  esprit: { left: "48%", top: "5%", type: "stat" },
  coeur: { left: "18%", top: "57%", type: "stat" },
  corps: { left: "78%", top: "56%", type: "stat" },
  magie: { left: "48%", top: "35%", type: "stat" },
  bluff: { left: "10%", top: "11%", type: "competence" },
  farce: { left: "10%", top: "15%", type: "competence" },
  tactique: { left: "11%", top: "20%", type: "competence" },
  rumeur: { left: "10%", top: "25%", type: "competence" },
  bagarre: { left: "91%", top: "10%", type: "competence" },
  endurance: { left: "93%", top: "14%", type: "competence" },
  perception: { left: "93%", top: "19%", type: "competence" },
  precision: { left: "91%", top: "23%", type: "competence" },
  decorum: { left: "55%", top: "73%", type: "competence" },
  discretion: { left: "56%", top: "76%", type: "competence" },
  persuasion: { left: "56%", top: "81%", type: "competence" },
  romance: { left: "56%", top: "85%", type: "competence" },
};

function MagicCircle({ player }) {
  return (
    <div id="magic-circle" style={{ backgroundImage: MagicCircleImg }}>
      <MagicCircleImg id="magic-circle-img" />
      {Object.keys(stats_positions).map((k) => (
        <div
          key={k}
          className={`player-statistic magic-${stats_positions[k].type}`}
          style={{
            transform: `translate(${stats_positions[k].left}, ${stats_positions[k].top})`,
          }}
        >
          {player.stats[k] || player.competences[k]}
        </div>
      ))}
    </div>
  );
}

export default MagicCircle;

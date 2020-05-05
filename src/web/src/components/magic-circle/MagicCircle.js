import React, { useState } from "react";
//import { ReactComponent as MagicCircleImg } from "./magic-circle.png";
import "./magic-circle.css";

const stats_positions = {
  esprit: { left: 48, top: 0, type: "stat" },
  coeur: { left: 18, top: 60, type: "stat" },
  corps: { left: 78, top: 58, type: "stat" },
  magie: { left: 48, top: 35, type: "stat" },
  bluff: { left: 10, top: 7, type: "competence" },
  farce: { left: 10, top: 12, type: "competence" },
  tactique: { left: 14, top: 17, type: "competence" },
  rumeur: { left: 13, top: 22, type: "competence" },
  bagarre: { left: 94, top: 5, type: "competence" },
  endurance: { left: 98, top: 10, type: "competence" },
  perception: { left: 97, top: 15, type: "competence" },
  precision: { left: 96, top: 20, type: "competence" },
  decorum: { left: 57, top: 77, type: "competence" },
  discretion: { left: 59, top: 82, type: "competence" },
  persuasion: { left: 59, top: 87, type: "competence" },
  romance: { left: 57, top: 92, type: "competence" },
};

function MagicCircle({ player, setStateSelection, setCompetenceSelection }) {
  return (
    <div id="magic-circle">
      <img src="/magic-circle.png" alt="magic circle" id="magic-circle-img" />
      {Object.keys(stats_positions)
        .sort((a, b) => stats_positions[a].top - stats_positions[b].top)
        .map((k) => (
          <div
            key={k}
            className={`player-statistic magic-${stats_positions[k].type}`}
            style={{
              //transform: `translate(${stats_positions[k].left}%, ${stats_positions[k].top}%)`,
              left: `${stats_positions[k].left}%`,
              top: `${stats_positions[k].top}%`,
            }}
          >
            <button
              className="stat-button"
              onClick={() => {
                stats_positions[k].type === "stat"
                  ? setStateSelection(k)
                  : setCompetenceSelection(k);
              }}
            >
              {player.stats[k] || player.competences[k]}
            </button>
          </div>
        ))}
    </div>
  );
}

export default MagicCircle;

import React from "react";
import MagicCircle from "../components/magic-circle";

function Stats({ player, ...props }) {
  return <MagicCircle player={player} />;
}

export default Stats;

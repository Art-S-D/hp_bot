import React, { useState, useEffect } from "react";
import "./inventory.css";

function Category({ category }) {
  return (
    <div className="inventory-category" key={category.name}>
      <span>{category.name}</span>
      {category.items.map((it) => (
        <div className="inventory-item" key={it}>
          {it}
        </div>
      ))}
    </div>
  );
}

function Inventory({ player, ...props }) {
  return (
    <div>
      {player.inventory.map(
        (i) => !i.name.match(/.*CARTES.*/) && <Category category={i} />
      )}
    </div>
  );
}

export default Inventory;

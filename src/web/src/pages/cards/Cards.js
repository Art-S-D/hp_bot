import React, { useState, useEffect } from "react";
import { Trash } from "@styled-icons/boxicons-regular";
import "./cards.css";
const env = require("../../env");

function Card({ card }) {
  function handleRemove(e) {
    fetch("/remove-card", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ card: card._id }),
    })
      .catch((e) => console.error(e))
      .then((x) => window.location.reload());
  }
  return (
    <div className={`card-element card-category-${card.category}`}>
      <div className="card-name">{card.name}</div>
      <div className="card-description">{card.description}</div>
      <Trash className="card-remove" id={card._id} onClick={handleRemove} />
    </div>
  );
}

function Cards({ player, ...props }) {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    if (!cards)
      fetch(`/cards`).then(
        (x) => x.status === 200 && x.json().then((c) => setCards(c))
      );
  });
  console.log(cards);
  return (
    cards && (
      <div id="card-wrapper">
        <table id="card-table">
          <tbody>
            {cards.map(
              (_, i) =>
                i % 4 === 0 && (
                  <tr key={i}>
                    <td className="card-td">
                      <Card card={cards[i]} />
                    </td>
                    {cards[i + 1] && (
                      <td className="card-td">
                        <Card card={cards[i + 1]} />
                      </td>
                    )}
                    {cards[i + 2] && (
                      <td className="card-td">
                        <Card card={cards[i + 2]} />
                      </td>
                    )}
                    {cards[i + 3] && (
                      <td className="card-td">
                        <Card card={cards[i + 3]} />
                      </td>
                    )}
                  </tr>
                )
            )}
          </tbody>
        </table>
        <form id="add-card" action="/add-card" method="post">
          <label>Ajouter des cartes</label>
          <div>
            <label>Nom:</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label>Catégorie:</label>
            <input type="text" name="category" />
          </div>
          <div>
            <label>Quantité:</label>
            <input type="number" name="quantity" />
          </div>
          <div>
            <input type="submit" value="Ajouter" />
          </div>
        </form>
      </div>
    )
  );
}

export default Cards;

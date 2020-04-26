import React, { useEffect, useState } from "react";
import "./pnjs.css";

function Pnjs({ isAdmin }) {
  const [pnjList, setPnjList] = useState([]);
  useEffect(() => {
    const i = setInterval(() => {
      fetch("/pnjs/latest").then(
        (x) => x.status === 200 && x.json().then((p) => setPnjList(p))
      );
    }, 2000);
    return () => clearInterval(i);
  });
  return (
    <div id="pnjs">
      <ul id="pnj-list">
        {pnjList.map((p) => (
          <li className="pnj-item" key={p._id}>
            <img className="pnj-image" alt={p.name} src={p.picture}></img>
            <ul className="pnj-text">
              <li className="pnj-fullname">{p.fullname}</li>
              {/*<li className="pnj-name">{p.name}</li>*/}
              <li className="pnj-house">De la maison {p.house}</li>
              <li className="pnj-year">
                Année {p.year > 0 ? "+" : ""}
                {p.year}
              </li>
              <li className="pnj-description">{p.description}</li>
            </ul>
          </li>
        ))}
      </ul>
      {/*isAdmin && (*/}
      <form id="add-pnj" action="/pnjs/new" method="POST">
        <input type="text" name="name" id="input-pnj" />{" "}
        <input type="submit" value="ajouter un pnj" />
      </form>
      {/*})}*/}
    </div>
  );
}

export default Pnjs;

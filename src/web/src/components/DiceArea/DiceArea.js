import React, { useEffect, useState } from "react";
import "./dice-area.css";
import "./die.css";

const sides = [
  { x: 130, y: 75, z: 0 }, //1
  { x: -45, y: -75, z: 0 }, //2
  { x: 130, y: 0, z: 0 }, //3
  { x: -57, y: 220, z: 0 }, //4
  { x: -57, y: 146, z: 0 }, //5
  { x: 15, y: 40, z: 0 }, //6
  { x: 110, y: 133, z: 86 }, //7
  { x: 10, y: 0, z: 180 }, //8
  { x: 10, y: 252, z: 0 }, //9
  { x: -30, y: 200, z: 100 }, //10
  { x: 18, y: -35, z: 0 }, //11
  { x: 50, y: -60, z: -140 }, //12
  { x: 195, y: 0, z: 180 }, //13
  { x: 15, y: 105, z: 0 }, //14
  { x: 30, y: -200, z: 145 }, //15
  { x: 130, y: 145, z: 0 }, //16
  { x: 130, y: 215, z: 0 }, //17
  { x: -55, y: 0, z: 0 }, //18
  { x: 130, y: 286, z: 0 }, //19
  { x: -57, y: 75, z: 0 }, //20
];

function DiceFrame(props) {
  return (
    <div className="d20" {...props}>
      <div className="cap-top">
        <div className="side one">
          <div className="number">18</div>
        </div>
        <div className="side two">
          <div className="number">2</div>
        </div>
        <div className="side three">
          <div className="number">4</div>
        </div>
        <div className="side four">
          <div className="number">5</div>
        </div>
        <div className="side five">
          <div className="number">20</div>
        </div>
      </div>
      <div className="side six">
        <div className="number">8</div>
      </div>
      <div className="side seven">
        <div className="number">7</div>
      </div>
      <div className="side eight">
        <div className="number">15</div>
      </div>
      <div className="side nine">
        <div className="number">10</div>
      </div>
      <div className="side ten">
        <div className="number">12</div>
      </div>
      <div className="side eleven">
        <div className="number">11</div>
      </div>
      <div className="side twelve">
        <div className="number">9.</div>
      </div>
      <div className="side thirteen">
        <div className="number">13</div>
      </div>
      <div className="side fourteen">
        <div className="number">14</div>
      </div>
      <div className="side fifteen">
        <div className="number">6.</div>
      </div>
      <div className="cap-bottom">
        <div className="side sixteen">
          <div className="number">16</div>
        </div>
        <div className="side seventeen">
          <div className="number">1</div>
        </div>
        <div className="side eighteen">
          <div className="number">3</div>
        </div>
        <div className="side nineteen">
          <div className="number">19</div>
        </div>
        <div className="side twenty">
          <div className="number">17</div>
        </div>
      </div>
    </div>
  );
}

function Die({ value }) {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);

  function rotate(x, y, z) {
    setRotationX(x);
    setRotationY(y);
    setRotationZ(z);
  }

  function setValue(v) {
    const side = sides[v - 1];
    if (side) {
      rotate(side.x, side.y, side.z);
    }
  }

  /*function handleClick() {
    rotate(Math.random() * 360, Math.random() * 360, Math.random() * 360);
  }*/

  useEffect(() => {
    setValue(value);
  });

  return (
    <DiceFrame
      onClick={() => {} /*handleClick*/}
      style={{
        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
      }}
    />
  );
}

function Home({ player, ...props }) {
  const [rolls, setRolls] = useState([]);

  const [frank, setFrank] = useState(20);
  const [zango, setZango] = useState(20);
  const [nico, setNico] = useState(20);

  function mostRecentRoll() {
    const tmp = rolls.sort((a, b) => a - b)[rolls.length - 1];
    return tmp && tmp.date;
  }

  function update(rolls) {
    setRolls(rolls);
    let f = rolls
      .filter((x) => x.name === "Frank Fizeman")
      .sort((a, b) => a.date - b.date);
    let n = rolls
      .filter((x) => x.name === "Nircosia Verpey")
      .sort((a, b) => a.date - b.date);
    let z = rolls
      .filter((x) => x.name === "Zango le Deuzo")
      .sort((a, b) => a.date - b.date);

    setFrank(f[f.length - 1] || 20);
    setNico(n[n.length - 1] || 20);
    setZango(z[z.length - 1] || 20);
  }

  function fetchAndUpdate() {
    const d = mostRecentRoll();
    fetch(d ? "/rolls/latest?date=" + d : "/rolls/latest", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((x) => x.status === 200 && x.json().then((r) => update(r)));
  }

  useEffect(() => {
    setInterval(() => {
      fetchAndUpdate();
    }, 1000);
  }, []);

  function handleRoll(e) {
    fetch("/rolls/new", { method: "POST" }).then(() => fetchAndUpdate());
  }

  return (
    <div id="dice-area">
      <table id="dice-table">
        <tbody>
          <tr className="dice-tr">
            <td>
              <label>Frank</label>
            </td>
            <td>
              <Die value={frank.value} />
            </td>
          </tr>
          <tr className="dice-tr">
            <td>
              <label>Nico</label>
            </td>
            <td>
              <Die value={nico.value} />
            </td>
          </tr>
          <tr className="dice-tr">
            <td>
              <label>Zango</label>
            </td>
            <td>
              <Die value={zango.value} />
            </td>
          </tr>
        </tbody>
      </table>
      <div id="actions">
        <button onClick={handleRoll}>Roll</button>
        <div id="text-resume">
          {rolls
            .slice(0)
            .reverse()
            .map((x) => (
              <div className="text-resume-item">{`${x.name} a obtenu un ${x.value}`}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

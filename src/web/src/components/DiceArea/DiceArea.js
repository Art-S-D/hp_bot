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

const ANIMATION_SPEED = 0.08;

function valueSlider(from, to, progress) {
  return from + (to - from) * progress;
}

function rotEquals(a, b) {
  if (a === undefined || b === undefined) return true;
  return a.x === b.x && a.y === b.y && a.z === b.z;
}
function randRotationsFrom(from, to, nb) {
  let res = [from];
  const tmp = Math.random() * 2 * Math.PI;
  const speed = 100;
  const dx = Math.cos(tmp) * speed;
  const dy = Math.sin(tmp) * speed;
  for (let i = 0; i < nb - 3; i++) {
    const cur = res[res.length - 1];
    res.push({
      x: cur.x + dx,
      y: cur.y + dy,
      z: from.z,
    });
  }
  res.push({
    x: (res[res.length - 1].x + to.x) / 2,
    y: (res[res.length - 1].y + to.y) / 2,
    z: (res[res.length - 1].z + to.z) / 2,
  });
  res.push(to);
  return res;
}

function Die({ roll: { value, time } = { value: 20, time: 0 } }) {
  const [state, setState] = useState({
    animationProgress: 0,
    rotations: [sides[19]],
    scales: [1],
  });
  const { animationProgress, rotations, scales } = state;

  function nextRotation() {
    if (rotations.length > 1) {
      const rot = rotations[0];
      const target = rotations[1];
      return {
        x: valueSlider(rot.x, target.x, animationProgress),
        y: valueSlider(rot.y, target.y, animationProgress),
        z: valueSlider(rot.z, target.z, animationProgress),
      };
    } else if (rotations.length === 1) return rotations[0];
    else console.log(rotations);
  }

  function nextScale() {
    if (scales.length > 1) {
      return valueSlider(scales[0], scales[1], animationProgress);
    }
  }

  //when value is modified
  useEffect(() => {
    setState({
      rotations:
        rotations.length > 0
          ? randRotationsFrom(rotations[0], sides[value - 1], 6)
          : [sides[value - 1]],
      scales: [1, 1.1, 1.3, 1.2, 1.1, 1],
      animationProgress: 0,
    });
  }, [value, time]);

  const [updateTimeout, setUpdateTimeout] = useState(null);
  useEffect(() => {
    clearTimeout(updateTimeout);
    const ut = setTimeout(() => {
      if (animationProgress < 1.0) {
        setState({
          ...state,
          animationProgress: animationProgress + ANIMATION_SPEED,
        });
      } else {
        setState({
          ...state,
          rotations: rotations.length > 1 ? rotations.slice(1) : rotations,
          scales: scales.length > 1 ? scales.slice(1) : scales,
          animationProgress: 0,
        });
      }
    }, 10);
    setUpdateTimeout(ut);
  }, [animationProgress]);

  const { x, y, z } = nextRotation();
  const scale = nextScale();
  return (
    <DiceFrame
      style={{
        transform: `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg) scale3d(${scale},${scale},${scale})`,
      }}
    />
  );
}

function DiceArea({ player, ...props }) {
  const [rolls, setRolls] = useState([]);

  const [frank, setFrank] = useState();
  const [zango, setZango] = useState();
  const [nico, setNico] = useState();

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

    setFrank(f[f.length - 1] && f[f.length - 1]);
    setNico(n[n.length - 1] && n[n.length - 1]);
    setZango(z[z.length - 1] && z[z.length - 1]);
  }

  function fetchAndUpdate() {
    fetch("/rolls/latest", {
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
              <Die roll={frank} />
            </td>
          </tr>
          <tr className="dice-tr">
            <td>
              <label>Nico</label>
            </td>
            <td>
              <Die roll={nico} />
            </td>
          </tr>
          <tr className="dice-tr">
            <td>
              <label>Zango</label>
            </td>
            <td>
              <Die roll={zango} />
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
              <div
                className="text-resume-item"
                key={x.time}
              >{`${x.name} a obtenu un ${x.value}`}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DiceArea;

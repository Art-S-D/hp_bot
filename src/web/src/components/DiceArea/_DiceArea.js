import React, { useEffect, useState } from "react";
import "./dice-area.css";

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

function Die({ x, y, z }) {
  //   const [rotationX, setRotationX] = useState(0);
  //   const [rotationY, setRotationY] = useState(0);
  //   const [rotationZ, setRotationZ] = useState(0);
  let rotationX = x;
  let rotationY = y;
  let rotationZ = z;
  function rotate(x, y, z) {
    // setRotationX(x);
    // setRotationY(y);
    // setRotationZ(z);
  }

  function handleClick() {
    rotate(Math.random() * 360, Math.random() * 360, Math.random() * 360);
  }

  /*
  useEffect(() => {
    setTimeout(() => rotate(rotationX, rotationY + 1, rotationZ), 10);
  });*/

  return (
    <DiceFrame
      onClick={handleClick}
      style={{
        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
      }}
    />
  );
}

function Home({ player, ...props }) {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);

  /*function handleX(e) {
    setRotationX(e.target.value);
  }
  function handleY(e) {
    setRotationY(e.target.value);
  }
  function handleZ(e) {
    setRotationZ(e.target.value);
  }
  function handleTo(e) {
    let tmp = sides[e.target.value - 1];
    if (tmp) {
      setRotationX(tmp.x);
      setRotationY(tmp.y);
      setRotationZ(tmp.z);
    }
  }*/
  return (
    <div id="dice-area">
      <Die x={rotationX} y={rotationY} z={rotationZ} />
      {/*<div style={{ position: "relative", left: "200px" }}>
        x<input type="number" onChange={handleX} />
        <br />
        y<input type="number" onChange={handleY} />
        <br />
        z<input type="number" onChange={handleZ} />
        <br />
      </div>
      <div style={{ position: "absolute", left: "200px" }}>
        roll to
        <input type="number" onChange={handleTo} />
  </div>*/}
    </div>
  );
}

export default Home;

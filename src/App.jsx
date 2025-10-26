// Szorzo.jsx
import React, { useMemo, useState } from "react";
import ul from "./assets/ul.png";
import szabad from "./assets/szabad.png";
import code from "./assets/panel.jpg"

export default function Szorzo() {

  const [allSolved, setAllsolved] = useState(false);
  const szorzasok = useMemo(() => {
    const lista = [];
    for (let i = 1; i <= 5; i++) {
      const alapszam = [1, 2, 3, 4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 9, 10]
      const index = Math.ceil(Math.random() * 18);
      const a = alapszam[index]
      const b = Math.ceil(Math.random() * 10);
      lista.push({ a, b, eredmeny: a * b });
    }
    return lista;
  }, []);

  const [tippek, setTippek] = useState(() => Array(10).fill(""));
  const [ellenorzott, setEllenorzott] = useState(() => Array(10).fill(false));
  const [joVagyNem, setJoVagyNem] = useState(() => Array(10).fill(null));

  function handleChange(index, value) {
    const uj = [...tippek];
    uj[index] = value;
    setTippek(uj);
  }

  function handleKodTabla(e) {
    if (e.key === "Enter") {
      let solution = "";
      szorzasok.map((szam) => {
        solution += szam.eredmeny;
      })

      if (e.target.value == solution) {
        setAllsolved(true);
      }
    }
  }

  function handleCheck(index) {
    const tipp = tippek[index].trim();
    const ujEllen = [...ellenorzott];
    const ujJo = [...joVagyNem];

    ujEllen[index] = true;

    if (tipp !== "" && !Number.isNaN(Number(tipp))) {
      ujJo[index] = Number(tipp) === szorzasok[index].eredmeny;
    } else {
      ujJo[index] = false;
    }

    setEllenorzott(ujEllen);
    setJoVagyNem(ujJo);
  }

  function handleKeyDown(index, e) {
    if (e.key === "Enter") {
      handleCheck(index);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Kódtörő</h2>
      <p style={{ fontSize: "17px" }}>Leo, a társad börtönben ül. Szeretnéd kiszabadítani, de a kódot nem ismered a panelen. <br /> Talán a szorzás a megoldás... </p>
      <table style={{ position: "relative", top: "-20px" }}>
        <tr><td> <img src={allSolved ? szabad : ul} width={210}></img></td>
          <td>
            <img src={code} width={340} ></img>
            <input type="text"
              alt="kodtabla"
              style={{ position: "absolute", width: "135px", fontSize: "16px", height: "19px", top: "55px", left: "317px", zIndex: "23", borderRadius: "4px" }}
              onKeyDown={(e) => handleKodTabla(e)} >
            </input>
          </td>

        </tr>
      </table>


      {szorzasok.map((f, idx) => {
        const tipp = tippek[idx];
        const ellen = ellenorzott[idx];
        const jo = joVagyNem[idx];
        const bg = !ellen ? "white" : jo ? "lightgreen" : "salmon";

        return (
          <div key={idx} style={{ margin: "8px 0", fontSize: 20 }}>
            <span style={{ marginRight: 8 }}>{f.a} × {f.b} =</span>
            <input
              type="text"
              value={tipp}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              style={{
                width: 80,
                fontSize: 18,
                color: "black",
                textAlign: "center",
                backgroundColor: bg,
                marginRight: 8,
              }}
            />
            <button onClick={() => handleCheck(idx)} style={{ fontSize: 16 }}>
              Kész
            </button>
            {ellen && jo && <span style={{ marginLeft: 10 }}>Szuper!</span>}
            {ellen && jo === false && <span style={{ marginLeft: 10 }}>❌ Rossz</span>}
          </div>
        );
      })}

      {allSolved &&
        <div style={{ marginLeft: 10, fontSize: "18px", fontWeight: 'bold', color: 'yellow' }}>
          <span>Gratulálok, sikerült kiszabadítani Leot!</span>
          <br />
          <input type="button" value="Új játék?" onClick={() => window.location.reload()} style={{ marginLeft: 10, color: "white", marginTop: "10px", width: "300px", fontSize: "19px", padding: "5px 5px", cursor: "pointer" }} />
        </div>}
    </div>
  );
}

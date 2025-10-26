// Szorzo.jsx
import React, { useMemo, useState } from "react";

export default function Szorzo() {
  // egyszer generált feladatok
  const szorzasok = useMemo(() => {
    const lista = [];
    for (let i = 1; i <= 10; i++) {
      const a = Math.ceil(Math.random() * 10);
      const b = Math.ceil(Math.random() * 10);
      lista.push({ a, b, eredmeny: a * b });
    }
    return lista;
  }, []);

  // minden input értéke STRING (soha nem number)
  const [tippek, setTippek] = useState(() => Array(10).fill(""));
  const [ellenorzott, setEllenorzott] = useState(() => Array(10).fill(false));
  const [joVagyNem, setJoVagyNem] = useState(() => Array(10).fill(null)); // null/true/false

  function handleChange(index, value) {
    // Debug log: ha valami furcsa történik, itt látszik
    // console.log("handleChange", index, typeof value, value);
    const uj = [...tippek];
    uj[index] = value;            // TÁROLJUK STRINGKÉNT
    setTippek(uj);
  }

  function handleCheck(index) {
    const tipp = tippek[index].trim();
    const ujEllen = [...ellenorzott];
    const ujJo = [...joVagyNem];

    ujEllen[index] = true;

    // csak akkor próbáljuk meg számként értékelni, ha nem üres és szám
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
      <h2>Szorzótábla</h2>
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
            {ellen && jo && <span style={{ marginLeft: 10 }}>🎉 Szabad!</span>}
            {ellen && jo === false && <span style={{ marginLeft: 10 }}>❌ Rossz</span>}
          </div>
        );
      })}
    </div>
  );
}

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const Calculator = () => {
  const [inputNumber, setInputNumber] = useState("");
  const [wynik1, setWynik1] = useState(null);
  const [wynik2, setWynik2] = useState(null);

  const calculate = () => {
    const num = parseFloat(inputNumber);
    if (isNaN(num)) return;

    const afterVat = num - num * 0.23;
    const after19 = afterVat - afterVat * 0.19;

    setWynik1(afterVat.toFixed(2));
    setWynik2(after19.toFixed(2));
  };

  const reset = () => {
    setInputNumber("");
    setWynik1(null);
    setWynik2(null);
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center py-5 text-white">
      <div className="bg-dark text-center p-5 rounded shadow-lg">
        <h1 className="text-center mb-4">Na firmę</h1>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Wpisz liczbę"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && calculate()}
        />

        <div className="d-flex justify-content-between mb-4">
          <button type="button" className="btn btn-primary w-50 me-2" onClick={calculate}>
            OBLICZ
          </button>
          <button type="button" className="btn btn-danger w-50" onClick={reset}>
            RESETUJ
          </button>
        </div>

        {wynik1 !== null && (
          <div className="alert alert-secondary text-black">
            <p className="mb-2">Cena po odjęciu <b>VAT-u (23%)</b>:</p>
            <h4 className="mb-3">{wynik1} zł</h4>
            <p className="mb-2">Cena po odjęciu <b>19%</b> z poprzedniego wyniku:</p>
            <h4>{wynik2} zł</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;

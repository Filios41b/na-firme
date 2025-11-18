import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

const Calculator = () => {
  const [inputNumber, setInputNumber] = useState("");
  const [operations, setOperations] = useState(["", "", ""]);
  const [results, setResults] = useState([]);

  const percentages = {
    "23%": 0.23,
    "19%": 0.19,
    "4.5%": 0.045,
  };

  const calculate = () => {
    const num = parseFloat(inputNumber);
    if (isNaN(num)) return;

    let currentResult = num;
    const tempResults = [];

    operations.forEach((op) => {
      if (percentages[op] !== undefined) {
        currentResult -= currentResult * percentages[op];
        tempResults.push({ label: op, value: currentResult.toFixed(2) });
      }
    });

    setResults(tempResults);
  };

  const reset = () => {
    setInputNumber("");
    setOperations(["", "", ""]);
    setResults([]);
  };

  const handleOperationChange = (index, value) => {
    const newOperations = [...operations];
    newOperations[index] = value;
    setOperations(newOperations);
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

        {operations.map((op, i) => (
          <select
            key={i}
            className="form-select mb-2"
            value={operations[i]}
            onChange={(e) => handleOperationChange(i, e.target.value)}
          >
            <option value="">Brak operacji</option>
            <option value="23%">23%</option>
            <option value="19%">19%</option>
            <option value="4.5%">4.5%</option>
          </select>
        ))}

        <div className="d-flex justify-content-between mb-4">
          <button type="button" className="btn btn-primary w-50 me-2" onClick={calculate}>
            OBLICZ
          </button>
          <button type="button" className="btn btn-danger w-50" onClick={reset}>
            RESETUJ
          </button>
        </div>

        {results.length > 0 && (
          <div className="alert alert-secondary text-black">
            {results.map((res, i) => (
              <div key={i} className="mb-3">
                <p className="mb-1">Po odjęciu <b>{res.label}</b>:</p>
                <h4
                  className="mb-0"
                  style={{
                    fontWeight: "bold",
                    color: i === results.length - 1 ? "green" : "black",
                  }}
                >
                  {res.value} zł
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;


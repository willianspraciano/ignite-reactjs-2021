import React, { useState } from 'react';

// imutabilidade -> não pode alterar diretamente o
// conteúdo daquela variável, mas precisamos assinar
// um novo espaço de memória para a variével.
// A imutabilidade existe no state do React.

export default function Counter() {
  let [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button type="button" onClick={increment}>
        Increment +
      </button>
    </div>
  );
}

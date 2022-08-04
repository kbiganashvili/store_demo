import React from 'react';

export default function Header(props) {
  const { sum, searchFunction, inputFunction, inpuText } = props;

  return (
    <header id="header">
      <img src="logo.png" alt="logo" id="logoImg" />
      <input
        id="searchInput"
        type="text"
        placeholder="Name Of The Product"
        onInput={inputFunction}
        value={inpuText}
      />
      <button type="submit" id="searchBtn" onClick={searchFunction}>
        Search
      </button>
      <p>Total sum of chosen products: ${sum} USD</p>
    </header>
  );
}

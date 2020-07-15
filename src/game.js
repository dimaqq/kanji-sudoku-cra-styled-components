import React from "react";
import styled from "styled-components/macro";
import reading from "reading.json";
import easy from "easy.json";
import kanji from "kanji.json";

const Game = () => {
  void(reading);
  void(easy);
  void(kanji);
  return <Area>
    game
  </Area>;
};

export default Game;

const Area = styled.div`
  flex: none;
  outline: 1px dashed orange;
`;

import React from "react";
import styled from "styled-components/macro";
import reading from "reading.json";
import easy from "easy.json";
import kanji from "kanji.json";

const Game = () => {
  void(reading);
  void(easy);
  void(kanji);
  return <>
    <Info>info</Info>;
    <Area>
      {[...new Array(9*9)].map((_, i) => <Nib key={i}>{i}</Nib>)}
    </Area>
  </>;
};

export default Game;

const Info = styled.div`
  flex: 0 0 40vmin;
`;

const Area = styled.div`
  flex: 0 0 100vmin;
  outline: 1px dashed orange;
  display: grid;
  grid: repeat(9, 10vmin) / auto-flow 10vmin;
`;

const Nib = styled.div`
  text-align: center;
  line-height: 10vmin;
  border-top: 1px solid rgba(0,0,0,.3);
  border-left: 1px solid rgba(0,0,0,.3);
  &:nth-child(9n) { border-bottom: 1px solid black; }
  &:nth-child(n+73) { border-right: 1px solid black; }
  &:nth-child(3n+1) { border-top: 1px solid black; }
  &:nth-child(-n+9), &:nth-child(n+28):nth-child(-n+36), &:nth-child(n+55):nth-child(-n+63) { border-left: 1px solid black; }
`;

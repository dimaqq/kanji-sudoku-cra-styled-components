import React from "react";
import styled from "styled-components/macro";
import {filename} from "paths.macro";
import ulog from "ulog";
import kanji from "kanji.json";
const log = ulog(filename);  // eslint-disable-line no-unused-vars

const Settings = () => {
  return <Area>
    <Row>
      <Title>Kanji grade:</Title>
      { Object.keys(kanji).map(k => 
        <Button role="button" key={k} onClick={() => log.info(k)}>{k}</Button>)
      }
    </Row>
    <Row>
      <Title>Sudoku difficulty:</Title>
      { ["easy", "medium", "hard"].map(k =>
        <Button role="button" key={k} onClick={() => log.info(k)}>{k}</Button>)
      }
    </Row>
  </Area>;
};

export default Settings;

const Area = styled.div`
  flex: 0 0 10vmin;
  outline: 1px dashed red;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  flex: none;
  display: flex;
  &:first-child{ border-top: 1px solid black; }
  border-bottom: 1px solid black;
`;

const Title = styled.div`
  flex: auto;
`;

const Button = styled.div`
  box-sizing: border-box;
  padding: 0 .25em;
  border-left: 1px solid black;
  border-right: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(255,0,0,.1);
  }
`;

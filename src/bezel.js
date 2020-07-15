import React from "react";
import {Reset} from "styled-reset";
import styled from "styled-components/macro";
import Settings from "settings";
import Help from "help";
import Game from "game";

const Bezel = () => {
  return <Frame>
    <Reset/>
    <Settings/>
    <Help/>
    <Game/>
  </Frame>;
};

export default Bezel;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
`;

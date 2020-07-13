import React from "react";
import styled from "styled-components/macro";
import Settings from "settings";
import Help from "help";
import Game from "game";

const Bezel = () => {
  return <Frame>
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

import React from "react";
import {Provider} from "react-redux";
import {Reset} from "styled-reset";
import styled from "styled-components/macro";
import Settings from "settings";
import Help from "help";
import Game from "game";
import store from "store";

const Bezel = () => {
  return <Provider store={store}>
    <Frame>
      <Reset/>
      <Settings/>
      <Help/>
      <Game/>
    </Frame>
  </Provider>;
};

export default Bezel;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
`;

import React from "react";
import {Provider} from "react-redux";
import {Reset} from "styled-reset";
import styled from "styled-components/macro";
import Settings from "settings";
import Dictionary from "dictionary";
import Game from "game";
import store from "store";

const Bezel = () => {
  return <Provider store={store}>
    <Frame>
      <Reset/>
      <Settings/>
      <Dictionary/>
      <Game/>
    </Frame>
  </Provider>;
};

export default Bezel;

// Below is for portrait mode; figure out landscape mode.
const Frame = styled.div`
  display: flex;
  flex-direction: column;
  width: 75vmin;
  margin: auto;
`;

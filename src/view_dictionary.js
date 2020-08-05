import React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled, {keyframes} from "styled-components/macro";

const ViewDictionary = () => {
  const dispatch = useDispatch();
  const id = useSelector(state => state.viewing);
  const kanji = useSelector(state => state.glyphs[id]);
  if (id === undefined) return null;
  return <FullScreen onClick={() => dispatch({type: "VIEW"})}>
    <Block>{kanji}</Block>
  </FullScreen>;
};

export default ViewDictionary;

const FullScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
`;

const BlowUp = keyframes`
  0% { transform: scale(.9); }
  100% { transform: scale(1); }
`;

const Block = styled.div`
  margin: auto;
  width: 100vmin;
  height: 100vmin;
  font-size: 100vmin;
  font-family: "Kanji Stroke Order";
  animation: ${ BlowUp } .3s linear forwards;
`;

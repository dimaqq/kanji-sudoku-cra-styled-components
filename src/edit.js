import React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import Canvas from "draw";

const Edit = () => {
  const dispatch = useDispatch();
  const id = useSelector(state => state.editing);
  if (id === undefined) return null;

  const save = () => {
    dispatch({type: "EDIT"});
  };

  return <Glass onClick={save}>
    <Zoom onClick={e => e.stopPropagation()}>
      <Hack>
        <Canvas id={id}/>
      </Hack>
    </Zoom>
  </Glass>;
};

export default Edit;

const Glass = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);  /* except firefox :( */
  box-sizing: border-box;
  display: flex;
`;

const Zoom = styled.div`
  margin: auto;
  height: 60vmin;
  width: 60vmin;
  background-color: white;
  box-sizing: border-box;
  box-shadow: #aaa 0 0 10vmin;
  border-radius: 0.5vmin;
  padding: 0.5vmin;
  display: flex;
`;

// canvas just won't conform to flex or grid; ergo this hack
const Hack = styled.div`
  flex: auto;
  position: relative;
`;

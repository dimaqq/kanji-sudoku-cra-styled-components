import React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import {filename} from "paths.macro";
import ulog from "ulog";
import reading from "reading.json";
import easy from "easy.json";
import kanji from "kanji.json";
import Canvas from "draw";
const log = ulog(filename);  // eslint-disable-line no-unused-vars

const Game = () => {
  const editing = useSelector(state => state.game.bar);
  void(reading);
  void(easy);
  void(kanji);
  return <>
    <Info>info</Info>;
    <Area>
      {[...new Array(9*9)].map((_, i) => <Cell key={i} id={i}/>)}
      {editing?<Glass><Zoom><Canvas/></Zoom></Glass>:null}
    </Area>
  </>;
};

export default Game;

const Cell = ({id}) => {
  // Either a single Kanji (prefilled cell, selected by computer),
  // or a data URI (empty cell edited by user) or undefined (not edited)
  const value = useSelector(state => state.game.tiles[id]);
  const dispatch = useDispatch();
  const editable = !value || value.length > 1;
  const edit = editable && (() => dispatch({type: "GAME.EDIT", id}));
  return <Nib onClick={edit}>{editable?<img src={value} alt=""/>:value}</Nib>;
};

Cell.propTypes = {id: PropTypes.number.isRequired};

const Info = styled.div`
  flex: 0 0 40vmin;
`;

const Area = styled.div`
  position: relative;
  flex: 0 0 100vmin;
  outline: 1px dashed orange;
  display: grid;
  grid: repeat(9, 10vmin) / auto-flow 10vmin;
`;

const Nib = styled.div`
  text-align: center;
  line-height: 10vmin;
  box-sizing: border-box;
  border-top: 0.3vmin solid rgba(0,0,0,.3);
  border-left: 0.3vmin solid rgba(0,0,0,.3);
  &:nth-child(9n) { border-bottom: 0.3vmin solid black; }
  &:nth-child(n+73) { border-right: 0.3vmin solid black; }
  &:nth-child(3n+1) { border-top: 0.3vmin solid black; }
  &:nth-child(-n+9),
  &:nth-child(n+28):nth-child(-n+36),
  &:nth-child(n+55):nth-child(-n+63) { border-left: 0.3vmin solid black; }
`;

const Glass = styled.div`
  position: absolute;
  top: 0;
  width: 90vmin;
  height: 90vmin;
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

import React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import {filename} from "paths.macro";
import ulog from "ulog";
import reading from "reading.json";
import easy from "easy.json";
import kanji from "kanji.json";
const log = ulog(filename);  // eslint-disable-line no-unused-vars

const Game = () => {
  void(reading);
  void(easy);
  void(kanji);
  return <>
    <Area>
      {[...new Array(9*9)].map((_, i) => <Cell key={i} id={i}/>)}
    </Area>
  </>;
};

export default Game;

const Cell = ({id}) => {
  // Either a single Kanji (prefilled cell, selected by computer),
  // or a data URI (empty cell edited by user) or undefined (not edited)
  const value = useSelector(state => state.tiles[id]);
  const dispatch = useDispatch();
  const editable = !value || value.length > 1;
  const edit = editable && (() => dispatch({type: "EDIT", id}));
  return <Nib onClick={edit}>{editable?<img src={value} alt=""/>:value}</Nib>;
};

Cell.propTypes = {id: PropTypes.number.isRequired};

const Area = styled.div`
  position: relative;
  flex: auto;
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

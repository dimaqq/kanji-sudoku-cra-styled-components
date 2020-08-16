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
  const glyph = useSelector(state => state.glyphs[state.sudoku[id]]);
  const tile = useSelector(state => state.tiles[id]);
  const dispatch = useDispatch();
  const edit = glyph?undefined:() => dispatch({type: "EDIT", id});
  return <Nib onClick={edit} editable={!!edit}>{
    glyph?
      <Label>{glyph}</Label>:
      <Fix><Img src={tile} alt=""/></Fix>
  }</Nib>;
};

Cell.propTypes = {id: PropTypes.number.isRequired};

const Area = styled.div`
  position: relative;
  flex: none;
  display: grid;
  box-sizing: border-box;
  border: .1vmin solid black;
  grid: repeat(9, 1fr) / repeat(9, 1fr);
  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

const Nib = styled.div`
  text-align: center;
  cursor: ${ props => props.editable?"pointer":"default" };
  box-sizing: border-box;
  border: .1vmin solid gray;
  &:nth-child(n+73) { border-bottom: .1vmin solid black; }
  &:nth-child(3n+1) { border-left: .1vmin solid black; }
  &:nth-child(3n) { border-right: .1vmin solid black; }
  &:nth-child(-n+9),
  &:nth-child(n+28):nth-child(-n+36),
  &:nth-child(n+55):nth-child(-n+63) { border-top: .1vmin solid black; }
  &:nth-child(n+19):nth-child(-n+27),
  &:nth-child(n+46):nth-child(-n+54) { border-bottom: .1vmin solid black; }
  display: flex;
`;

const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

// Because Safari 😭
const Fix = styled.div`
`;

const Label = styled.div`
  flex: none;
  margin: auto;
  font-size: 5vmin;
`;

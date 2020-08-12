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
  const value = useSelector(state => state.tiles[id]); // || "https://placekitten.com/64/64";
  const dispatch = useDispatch();
  const editable = false && (!value || value.length > 1);
  const edit = editable && (() => dispatch({type: "EDIT", id}));
  return <Nib onClick={edit}>{
    editable?
      <Img src={value} alt=""/>:
      <Label>{value}{id}</Label>
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
  flex: auto;
  margin: auto;
  object-fit: fill;
  max-width: 100%;
`;

const Label = styled.div`
  flex: none;
  margin: auto;
`;

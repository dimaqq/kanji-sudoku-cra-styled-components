import React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import reading from "reading.json";

const Dictionary = () => {
  return <Table>
    { [...new Array(9)].map((_, i) => <Entry key={i} id={i}/>) }
  </Table>;
};

export default Dictionary;

const Entry = ({id}) => {
  const dispatch = useDispatch();
  const kanji = useSelector(state => state.glyphs[id]);
  const {kun, on} = reading[kanji] || {};
  return <Cell onClick={() => dispatch({type: "VIEW", id})}>
    <Stroke>{kanji}</Stroke>
    <Reading>{kun}</Reading>
    <Reading>{on}</Reading>
  </Cell>;
};

Entry.propTypes = {id: PropTypes.number.isRequired};

const Table = styled.div`
  display: grid;
  grid: repeat(3, 1fr) / auto-flow;
  gap: 1px;
  background-color: #aaa;
  box-sizing: border-box;
  border: 1px solid black;
  margin: 1vmin 0;
`;

const Cell = styled.div`
  background-color: white;
  display: grid;
  gap: 1px;
  background-color: #eee;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  grid-template-areas:
    "stroke reading-kun"
    "stroke reading-on";
  & > * { background-color: white; }
`;

const Stroke = styled.div`
  grid-area: stroke;
  font-size: 8vmin;
  font-family: "Kanji Stroke Order";
`;

const Reading = styled.div`
  font-size: 2vmin;
`;

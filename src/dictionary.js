import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

const Dictionary = () => {
  return <Table>
    { [...new Array(9)].map((_, i) => <Entry key={i} id={i}/>) }
  </Table>;
};

export default Dictionary;

const Entry = ({id}) => {
  return <Cell>
    <Stroke>{id}</Stroke>
    <Reading>reading</Reading>
    <Reading>reading</Reading>
  </Cell>;
};

Entry.propTypes = {id: PropTypes.number.isRequired};

const Table = styled.div`
  display: grid;
  grid: repeat(3, 1fr) / auto-flow;
  gap: 1px;
  background-color: rgba(0,0,0,.3);
  box-sizing: border-box;
  border: 1px solid black;
  margin: 1vmin 0;
`;

const Cell = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "stroke reading-kun"
    "stroke reading-on"
    "stroke .";
`;

const Stroke = styled.div`
  grid-area: stroke;
  font-size: 8vmin;
  font-family: "Kanji Stroke Order";
`;

const Reading = styled.div`
  font-size: 2vmin;
`;

import React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components/macro";
import {filename} from "paths.macro";
import ulog from "ulog";
import kanji from "kanji.json";
import Like from "like";
const log = ulog(filename);  // eslint-disable-line no-unused-vars

const Settings = () => {
  const dispatch = useDispatch();
  const current_grade = useSelector(state => state.grade);
  const current_difficulty = useSelector(state => state.difficulty);
  return <Area>
    <Row>
      <Title>Kanji grade:</Title>
      <Buttons>{
        Object.keys(kanji).map(grade => 
          <Button
            role="button"
            selected={grade === current_grade}
            key={grade}
            onClick={() => dispatch({type: "GRADE", grade})}>
            {grade}
          </Button>)
      }</Buttons>
    </Row>
    <Row>
      <Title>Sudoku difficulty:</Title>
      <Buttons>{
        ["easy", "medium", "hard"].map(difficulty =>
          <Button
            role="button"
            selected={difficulty === current_difficulty}
            key={difficulty}
            onClick={() => dispatch({type: "DIFFICULTY", difficulty})}>
            {difficulty}
          </Button>)
      }</Buttons>
      <Like/>
    </Row>
  </Area>;
};

export default Settings;

const Area = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  flex: none;
  display: flex;
  margin: .5em 0;
  font-size: 2vmin;
  font-family: "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const Title = styled.div`
  flex: auto;
  margin: auto 0;
`;

const Buttons = styled.div`
  flex: none;
  display: flex;
`;

const Button = styled.div`
  box-sizing: border-box;
  padding: .25em .5em;
  border-left: 1px solid black;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  cursor: pointer;
  background-color: ${ props => props.selected?"gold":"white" };
  &:hover {
    background-color: rgba(255,0,0,.1);
  }
  &:first-child {
    border-top-left-radius: .5em;
    border-bottom-left-radius: .5em;
    padding-left: .5em;
  }
  &:last-child {
    border-right: 1px solid black;
    border-top-right-radius: .5em;
    border-bottom-right-radius: .5em;
    padding-right: .5em;
  }
`;

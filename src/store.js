import {createStore} from "redux";
import {produce} from "immer";
import {filename} from "paths.macro";
import sudokus from "easy.json";
import ulog from "ulog";
const log = ulog(filename);  // eslint-disable-line no-unused-vars

const tools = window?.__REDUX_DEVTOOLS_EXTENSION__?.();

const INITIAL = {
  grade: undefined,
  difficulty: undefined,
  glyphs: [...new Array(9)],
  sudoku: [...new Array(9*9)],
  editing: undefined,
  tiles: [...new Array(9*9)],  // either a single Kanji or a data URI
};

const reducer = (state=INITIAL, action) => produce(state, draft => {
  switch (action.type) {
  case "DIFFICULTY":
    draft.difficulty = action.difficulty;
    draft.sudoku = sudoku_board(draft.difficulty);
    return;
  case "GRADE":
    draft.grade = action.grade;
    draft.sudoku = sudoku_board(draft.difficulty);
    return;
  case "EDIT":
    draft.editing = action.id;
    return;
  case "SAVE_TILE":
    draft.tiles[action.id] = action.data;
    return;
  default:
    return;
  }
});

export default createStore(reducer, tools);

const sudoku_board = (difficulty) => {
  void(difficulty);
  const s = sudokus[Math.floor(Math.random() * sudokus.length)];
  // FIXME perhaps edit the sudoku JSON file instead
  // ["..1", ".2.", ...] → [und, und, 0, und, 1, und, ...]
  return [...s.join("")].map(d => d === "."?undefined:parseInt(d)-1);
};

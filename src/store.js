import {createStore} from "redux";
import {produce} from "immer";
import {filename} from "paths.macro";
import sudokus from "easy.json";
import kanji from "kanji.json";
import ulog from "ulog";
const log = ulog(filename);  // eslint-disable-line no-unused-vars

const tools = window?.__REDUX_DEVTOOLS_EXTENSION__?.();

const INITIAL = {
  grade: undefined,
  difficulty: undefined,
  glyphs: [...new Array(9)],
  sudoku: [...new Array(9*9)],
  editing: undefined,
  viewing: undefined,
  tiles: [...new Array(9*9)],  // either a single Kanji or a data URI
};

const reducer = (state=undefined, action) => {
  if (state === undefined) {
    state = INITIAL;
    state.grade = "1";
    state.difficulty = "easy";
    state.glyphs = sample(kanji[state.grade]);
    state.sudoku = sudoku_board(state.difficulty);
  }
  return produce(state, draft => {
    switch (action.type) {
    case "DIFFICULTY":
      draft.difficulty = action.difficulty;
      draft.glyphs = sample(kanji[draft.grade]);
      draft.sudoku = sudoku_board(draft.difficulty);
      return;
    case "GRADE":
      draft.grade = action.grade;
      draft.glyphs = sample(kanji[draft.grade]);
      draft.sudoku = sudoku_board(draft.difficulty);
      return;
    case "EDIT":
      draft.editing = action.id;
      return;
    case "SAVE_TILE":
      draft.tiles[action.id] = action.data;
      return;
    case "VIEW":
      log.info(action);
      draft.viewing = action.id;
      return;
    default:
      return;
    }
  });
};

const sudoku_board = (difficulty) => {
  void(difficulty);
  const s = sudokus[Math.floor(Math.random() * sudokus.length)];
  // FIXME perhaps edit the sudoku JSON file instead
  // ["..1", ".2.", ...] → [und, und, 0, und, 1, und, ...]
  return [...s.join("")].map(d => d === "."?undefined:parseInt(d)-1);
};

const sample = (text, n=9) => {
  const pool = [...text];
  const rand = () => {
    const id = Math.floor(Math.random() * pool.length);
    return pool.splice(id, 1)[0];  // without replacement
  };

  return [...Array(n)].map(() => rand());
};

export default createStore(reducer, tools);

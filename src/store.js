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
  tiles: undefined,
};

const reducer = (state=undefined, action) => {
  if (state === undefined) {
    state = INITIAL;
    state.grade = load_grade();
    state.difficulty = load_difficulty();
    state.glyphs = load_glyphs();
    state.sudoku = load_sudoku();
    state.tiles = load_tiles();
    if (!state.grade || !state.difficulty || !state.glyphs || !state.sudoku || !state.tiles) {
      state.grade = "1";
      state.difficulty = "easy";
      state.glyphs = new_glyphs(state.grade);
      state.sudoku = new_sudoku(state.difficulty);
      state.tiles = erase_tiles();
    }
  }
  return produce(state, draft => {
    switch (action.type) {
    case "DIFFICULTY":
      draft.difficulty = action.difficulty;
      localStorage.setItem("difficulty", action.difficulty);
      draft.glyphs = new_glyphs(draft.grade);
      draft.sudoku = new_sudoku(draft.difficulty);
      draft.tiles = erase_tiles();
      return;
    case "GRADE":
      draft.grade = action.grade;
      localStorage.setItem("grade", action.grade);
      draft.glyphs = new_glyphs(draft.grade);
      draft.sudoku = new_sudoku(draft.difficulty);
      draft.tiles = erase_tiles();
      return;
    case "EDIT":
      draft.editing = action.id;
      return;
    case "SAVE_TILE":
      draft.tiles[action.id] = action.data;
      localStorage.setItem(`tile-${ action.id }`, action.data);
      return;
    case "VIEW":
      draft.viewing = action.id;
      return;
    default:
      return;
    }
  });
};

const new_sudoku = (difficulty) => {
  void(difficulty);
  const s = sudokus[Math.floor(Math.random() * sudokus.length)];
  // FIXME perhaps edit the sudoku JSON file instead
  // ["..1", ".2.", ...] → [und, und, 0, und, 1, und, ...]
  const rv = [...s.join("")].map(d => d === "."?undefined:parseInt(d)-1);
  localStorage.setItem("sudoku", JSON.stringify(rv));
  return rv;
};

const sample = (text, n=9) => {
  const pool = [...text];
  const rand = () => {
    const id = Math.floor(Math.random() * pool.length);
    return pool.splice(id, 1)[0];  // without replacement
  };

  return [...Array(n)].map(() => rand());
};

const new_glyphs = (grade) => {
  const rv = sample(kanji[grade]);
  localStorage.setItem("glyphs", JSON.stringify(rv));
  return rv;
};

// FIXME ideally validate data shape
const load_grade = () => localStorage.getItem("grade");
const load_difficulty = () => localStorage.getItem("difficulty");
const load_glyphs = () => JSON.parse(localStorage.getItem("glyphs"));
const load_sudoku = () => JSON.parse(localStorage.getItem("sudoku"));

const erase_tiles = () => {
  [...new Array(9*9)].map((_, id) => localStorage.removeItem(`tile-${ id }`));
  return [...new Array(9*9)];
};

const load_tiles = () => {
  return [...new Array(9*9)].map((_, id) => localStorage.getItem(`tile-${ id }`));
};

export default createStore(reducer, tools);

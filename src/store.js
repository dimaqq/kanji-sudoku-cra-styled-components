import {createStore} from "redux";
import {produce} from "immer";
import {filename} from "paths.macro";
import sudokus from "easy.json";
import ulog from "ulog";
const log = ulog(filename);

const tools = window?.__REDUX_DEVTOOLS_EXTENSION__?.();

const INITIAL = {
  glyphs: [...new Array(9)],
  sudoku: [...new Array(9*9)],
  editing: undefined,
  tiles: [...new Array(9*9)],  // either a single Kanji or a data URI
};

const reducer = (state=INITIAL, action) => produce(state, draft => {
  log.debug(action);
  switch (action) {
  case "SETTINGS.DIFFICULTY":
    draft.sudoku = sudoku_board().join("").map(d => d === "."?undefined:parseInt(d)-1);
    return;
  case "SETTINGS.GRADE":
    draft.yy = 42;
    return;
  case "GAME.EDIT":
    draft.editing = action.id;
    return;
  case "GAME.SAVE_TILE":
    draft.tiles[action.id] = action.data;
    return;
  default:
    return;
  }
});

export default createStore(reducer, tools);

const sudoku_board = () => sudokus[Math.floor(Math.random() * sudokus.length)];

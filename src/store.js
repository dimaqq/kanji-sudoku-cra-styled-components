import {createStore, combineReducers} from "redux";
import {produce} from "immer";
import {filename} from "paths.macro";
import sudokus from "easy.json";
import ulog from "ulog";
const log = ulog(filename);

const tools = window?.__REDUX_DEVTOOLS_EXTENSION__?.();

const SETTINGS_INITIAL = {
  glyphs: [...new Array(9)],
  sudoku: [...new Array(9*9)],
};

const settings = (state=SETTINGS_INITIAL, action) => produce(state, draft => {
  log.debug(action);
  switch (action) {
  case "SETTINGS.DIFFICULTY":
    draft.sudoku = sudoku_board().join("").map(d => d === "."?undefined:parseInt(d)-1);
    return;
  case "SETTINGS.GRADE":
    draft.yy = 42;
    return;
  default:
    return;
  }
});

const GAME_INITIAL = {
  editing: undefined,
  tiles: [...new Array(9*9)],  // either a single Kanji or a data URI
};

const game = (state=GAME_INITIAL, action) => produce(state, draft => {
  switch (action) {
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

const reducers = (state, action) => combineReducers({
  settings,
  game,
})(state, action);

export default createStore(reducers, tools);

const sudoku_board = () => sudokus[Math.floor(Math.random() * sudokus.length)];

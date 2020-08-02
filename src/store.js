import {createStore, combineReducers} from "redux";
import {produce} from "immer";
import {filename} from "paths.macro";
import ulog from "ulog";
const log = ulog(filename);

const tools = window?.__REDUX_DEVTOOLS_EXTENSION__?.();

const settings = (state={}, action) => produce(state, draft => {
  log.debug(action);
  switch (action) {
  case "FOOBAR":
    draft.xx = 42;
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

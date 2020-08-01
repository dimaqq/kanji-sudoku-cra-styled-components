import {createStore, combineReducers} from "redux";
import {produce} from "immer";

const tools = window?.__REDUX_DEVTOOLS_EXTENSION__?.();

export default createStore(reducers, tools);

const reducers = (state, action) => combineReducers({
  settings,
  foo,
})(state, action);

const settings = (state, action) => produce(state, draft => {
  switch (action) {
  case "FOOBAR":
    draft.xx = 42;
    return;
  default:
    return;
  }
});

const foo = (state, action) => produce(state, draft => {
  switch (action) {
  case "FOOBAR":
    draft.xx = 42;
    return;
  default:
    return;
  }
});

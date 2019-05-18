import { createSelector } from "reselect";

const appName = "rr2";
const moduleName = "todos";

/**
 * Constants
 */
const CHANGE_NEW_ITEM_TEXT = `${appName}/${moduleName}/CHANGE_NEW_ITEM_TEXT`;
const CHANGE_ITEM_IS_DONE = `${appName}/${moduleName}/CHANGE_ITEM_IS_DONE`;
const CHANGE_ITEM_TEXT = `${appName}/${moduleName}/CHANGE_ITEM_TEXT`;
// const ADD_NEW_ITEM = `${appName}/${moduleName}/ADD_NEW_ITEM`;
const SET_FILTER = `${appName}/${moduleName}/SET_FILTER`;

const DELETE_ITEM_REQUEST = `${appName}/${moduleName}/DELETE_ITEM/REQUEST`;
const DELETE_ITEM_SUCCESS = `${appName}/${moduleName}/DELETE_ITEM/SUCCESS`;
const DELETE_ITEM_FAILURE = `${appName}/${moduleName}/DELETE_ITEM/FAILURE`;

const FETCH_LIST_REQUEST = `${appName}/${moduleName}/FETCH_LIST/REQUEST`;
const FETCH_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_LIST/SUCCESS`;
const FETCH_LIST_FAILURE = `${appName}/${moduleName}/FETCH_LIST/FAILURE`;

const SAVE_ITEM_REQUEST = `${appName}/${moduleName}/SAVE_ITEM/REQUEST`;
const SAVE_ITEM_SUCCESS = `${appName}/${moduleName}/SAVE_ITEM/SUCCESS`;
const SAVE_ITEM_FAILURE = `${appName}/${moduleName}/SAVE_ITEM/FAILURE`;

export const FILTER_STATES = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  DONE: "DONE"
};

/**
 * Action Creators
 */
export const changeNewItemText = text => ({
  type: CHANGE_NEW_ITEM_TEXT,
  payload: text
});

export const deleteItem = itemId => async (dispatch, _getState, { api }) => {
  dispatch({ type: DELETE_ITEM_REQUEST, payload: itemId });

  try {
    await api.todos.deleteItem(itemId);
    dispatch({
      type: DELETE_ITEM_SUCCESS,
      payload: itemId
    });
  } catch (error) {
    dispatch({
      type: DELETE_ITEM_FAILURE,
      payload: error
    });
  }
};

export const addNewItem = () => async (dispatch, _getState, { api }) => {
  const state = stateSelector(_getState());
  const newItem = {
    id: getId(),
    text: state.newItemText,
    isDone: false
  };

  dispatch({
    type: SAVE_ITEM_REQUEST
  });

  try {
    const data = await api.todos.create(newItem);

    dispatch({
      type: SAVE_ITEM_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SAVE_ITEM_FAILURE,
      payload: error
    });
  }
};

export const fetchList = () => async (dispatch, _getState, { api }) => {
  dispatch({
    type: FETCH_LIST_REQUEST
  });

  try {
    const data = await api.todos.getAll();

    dispatch({
      type: FETCH_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_LIST_FAILURE,
      payload: error
    });
  }
};

export const changeItemIsDone = (itemId, isDone) => ({
  type: CHANGE_ITEM_IS_DONE,
  payload: {
    itemId,
    isDone
  }
});

export const changeItemText = (itemId, text) => ({
  type: CHANGE_ITEM_TEXT,
  payload: {
    itemId,
    text
  }
});

export const showAll = () => ({
  type: SET_FILTER,
  payload: FILTER_STATES.ALL
});
export const showActive = () => ({
  type: SET_FILTER,
  payload: FILTER_STATES.ACTIVE
});
export const showDone = () => ({
  type: SET_FILTER,
  payload: FILTER_STATES.DONE
});

/**
 * helper
 */
const getId = () => `${new Date().getTime()}-${Math.random()}`;

/**
 * Default state
 */
export const defaultState = {
  filter: "ALL", // "ALL", "ACTIVE", "DONE"
  newItemText: "",
  isLoading: false,
  error: null,
  items: []
};

/**
 * Reducer
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        items: []
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload
      };
    case FETCH_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case CHANGE_NEW_ITEM_TEXT:
      return {
        ...state,
        newItemText: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case SAVE_ITEM_REQUEST:
      return {
        ...state,
        newItemText: ""
      };
    case SAVE_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    // case SAVE_ITEM_FAILURE:

    // case ADD_NEW_ITEM:
    //   return {
    //     ...state,
    //     newItemText: "",
    //     items: [
    //       ...state.items,
    //       {
    //         id: action.payload.id,
    //         text: state.newItemText,
    //         isDone: false
    //       }
    //     ]
    //   };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case CHANGE_ITEM_IS_DONE:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.itemId) {
            return {
              ...item,
              isDone: action.payload.isDone
            };
          }
          return item;
        })
      };
    case CHANGE_ITEM_TEXT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.itemId) {
            return {
              ...item,
              text: action.payload.text
            };
          }
          return item;
        })
      };
    default:
      return state;
  }
}

/**
 * Selector
 */

const stateSelector = state => state[moduleName];

export const isLoadingSelector = createSelector(
  stateSelector,
  state => state.isLoading
);

export const errorMessageSelector = createSelector(
  stateSelector,
  state => state.error && state.error.message
);

const todosSelector = createSelector(
  stateSelector,
  state => state.items
);

export const filteredTodosSelector = createSelector(
  todosSelector,
  state => stateSelector(state).filter,

  function filterTodos(list, filter) {
    if (filter === FILTER_STATES.ACTIVE) {
      return list.filter(item => !item.isDone);
    }

    if (filter === FILTER_STATES.DONE) {
      return list.filter(item => item.isDone);
    }

    return list;
  }
);

import { createSelector } from "reselect";

const appName = "rr2";
export const moduleName = "products";

/**
 * Constants
 */
const FETCH_LIST_REQUEST = `${appName}/${moduleName}/FETCH_LIST/REQUEST`;
const FETCH_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_LIST/SUCCESS`;
const FETCH_LIST_FAILURE = `${appName}/${moduleName}/FETCH_LIST/FAILURE`;

const FETCH_ONE_REQUEST = `${appName}/${moduleName}/FETCH_ONE/REQUEST`;
const FETCH_ONE_SUCCESS = `${appName}/${moduleName}/FETCH_ONE/SUCCESS`;
const FETCH_ONE_FAILURE = `${appName}/${moduleName}/FETCH_ONE/FAILURE`;

/**
 * Action creator
 */

export const fetchProducts = () => async (dispatch, _getState, { api }) => {
  dispatch({
    type: FETCH_LIST_REQUEST
  });

  try {
    const data = await api.products.getAll();

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

export const fetchProduct = id => async (dispatch, _getState, { api }) => {
  dispatch({
    type: FETCH_ONE_REQUEST,
    payload: id
  });

  try {
    const data = await api.products.getOne(id);

    dispatch({
      type: FETCH_ONE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: FETCH_ONE_FAILURE,
      payload: error
    });
  }
};

const defaultState = {
  isLoading: false,
  list: [],
  one: null
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        list: []
      };
    case FETCH_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case FETCH_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
        one: null
      };
    case FETCH_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        one: action.payload
      };
    default:
      return state;
  }
}

/**
 * Selectors
 */
export const stateSelector = state => state[moduleName];
export const productsSelector = createSelector(
  stateSelector,
  state => state.list
);
export const productSelector = createSelector(
  stateSelector,
  state => state.one
);
export const isLoadingSelector = createSelector(
  stateSelector,
  state => state.isLoading
);

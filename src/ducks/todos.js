import { createSelector } from "reselect";

const appName = "react-redux2";
const prefix = `${appName}/todos`;
const moduleName = "todos";

//action
const CHANGE_NEW_ITEM_TEXT = `${prefix}/CHANGE_NEW_ITEM_TEXT`;
const HANDLE_IS_DONE = `${prefix}/HANDLE_IS_DONE`;
const CHANGE_TEXT = `${prefix}/CHANGE_TEXT`;
const FETCH_LIST_REQUEST = `${prefix}/FETCH_LIST_REQUEST`;
const FETCH_LIST_SUCCESS = `${prefix}/FETCH_LIST_SUCCESS`;
const FETCH_LIST_FAILURE = `${prefix}/FETCH_LIST_FAILURE`;

const FETCH_ONE_REQUEST = `${prefix}/FETCH_ONE_REQUEST`;
const FETCH_ONE_SUCCESS = `${prefix}/FETCH_ONE_SUCCESS`;
const FETCH_ONE_FAILURE = `${prefix}/FETCH_ONE_FAILURE`;

const SAVE_ITEM_REQUEST = `${prefix}/SAVE_ITEM_REQUEST`;
const SAVE_ITEM_SUCCESS = `${prefix}/SAVE_ITEM_SUCCESS`;
const SAVE_ITEM_FAILURE = `${prefix}/SAVE_ITEM_FAILURE`;

const DELETE_ITEM_REQUEST = `${prefix}/DELETE_ITEM_REQUEST`;
const DELETE_ITEM_SUCCESS = `${prefix}/DELETE_ITEM_SUCCESS`;
const DELETE_ITEM_FAILURE = `${prefix}/DELETE_ITEM_FAILURE`;

const SAVE_REQUEST = `${prefix}/SAVE_REQUEST`;
const SAVE_SUCCESS = `${prefix}/SAVE_SUCCESS`;
const SAVE_FAILURE = `${prefix}/SAVE_FAILURE`;

const SAVE_TASK_REQUEST = `${prefix}/SAVE_TASK_REQUEST`;
const SAVE_TASK_SUCCESS = `${prefix}/SAVE_TASK_SUCCESS`;
const SAVE_TASK_FAILURE = `${prefix}/SAVE_TASK_FAILURE`;

const GET_TASK_REQUEST = `${prefix}/GET_TASK_REQUEST`;
const GET_TASK_SUCCESS = `${prefix}/GET_TASK_SUCCESS`;
const GET_TASK_FAILURE = `${prefix}/GET_TASK_FAILURE`;

//action creators

export const fetchList = () => async (dispatch, getState, { api }) => {
  dispatch({
    type: FETCH_LIST_REQUEST
  });
  try {
    await api.todos.getAll().then(data =>
      dispatch({
        type: FETCH_LIST_SUCCESS,
        payload: data
      })
    );
  } catch (error) {
    dispatch({
      type: FETCH_LIST_FAILURE,
      payload: error
    });
  }
};

export const fetchItem = () => async (dispatch, getState, { api }) => {
  dispatch({
    type: FETCH_ONE_REQUEST
  });
  try {
    const data = await api.todos.getOne();
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
export const fetchTask = () => async (dispatch, getState, { api }) => {
  dispatch({
    type: GET_TASK_REQUEST
  });
  try {
    const data = await api.todos.getTask();
    dispatch({
      type: GET_TASK_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_TASK_FAILURE,
      payload: error
    });
  }
};
export const saveName = newName => async (dispatch, getState, { api }) => {
  dispatch({
    type: SAVE_REQUEST
  });

  try {
    const name = await api.todos.saveName(newName);

    dispatch({
      type: SAVE_SUCCESS,
      payload: name
    });

    return name;
  } catch (error) {
    dispatch({
      type: SAVE_FAILURE,
      payload: error
    });
  }
};

export const saveTask = newTask => async (dispatch, getState, { api }) => {
  dispatch({
    type: SAVE_TASK_REQUEST
  });

  try {
    const task = await api.todos.saveTask(newTask);

    dispatch({
      type: SAVE_TASK_SUCCESS,
      payload: task
    });

    return task;
  } catch (error) {
    dispatch({
      type: SAVE_TASK_FAILURE,
      payload: error
    });
  }
};


export const addNewItem = () => async (dispatch, getState, { api }) => {
  const state = stateSelector(getState());
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
export const deleteItem = itemId => async (dispatch, getState, { api }) => {
  dispatch({
    type: DELETE_ITEM_REQUEST,
    payload: itemId
  });

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
export const changeNewItemText = text => ({
  type: CHANGE_NEW_ITEM_TEXT,
  payload: text
});

export const handleIsDone = (itemId, isDone) => ({
  type: HANDLE_IS_DONE,
  payload: {
    itemId,
    isDone
  }
});
export const changeText = (itemId, text) => ({
  type: CHANGE_TEXT,
  payload: {
    itemId,
    text
  }
});
export const showAll = () => ({
  type: "SET_FILTER",
  payload: "ALL"
});
export const showActive = () => ({
  type: "SET_FILTER",
  payload: "ACTIVE"
});
export const showDone = () => ({
  type: "SET_FILTER",
  payload: "DONE"
});

const getId = () => `${new Date().getTime()}-${Math.random()}`;

//default state
export const defaultState = {
  isLoading: false,
  showResults: true,
  filter: "ALL", // "ALL", "ACTIVE", "DONE"
  newItemText: "some",
  error: null,
  one: {
    name: " ",
    id: 1
  },
  task: {
    name: " ",
    id: 1
  },
  list: [
    {
      id: getId().toString(),
      text: "buy milk1",
      isDone: false
    },
    {
      id: getId().toString(),
      text: "buy meat1",
      isDone: true
    }
  ]
};

//reducer
export default function(state = defaultState, action) {
  if (action.type === FETCH_LIST_REQUEST) {
    return {
      ...state,
      error: null,
      isLoading: true,
      list: []
    };
  }
  if (action.type === FETCH_LIST_SUCCESS) {
    return {
      ...state,
      list: action.payload,
      isLoading: false,
      filter: "ALL"
    };
  }
  if (action.type === FETCH_LIST_FAILURE) {
    return {
      ...state,
      error: action.payload,
      isLoading: true
    };
  }
  if (action.type === FETCH_ONE_REQUEST) {
    return {
      ...state,
      one: null,
      isLoading: true
    };
  }
  if (action.type === FETCH_ONE_SUCCESS) {
    return {
      ...state,
      one: action.payload,
      isLoading: false
    };
  }
  if (action.type === GET_TASK_REQUEST) {
    return {
      ...state,
      task: null,
      isLoading: true
    };
  }
  if (action.type === GET_TASK_SUCCESS) {
    return {
      ...state,
      task: action.payload,
      isLoading: false
    };
  }
  if (action.type === SAVE_REQUEST) {
    return {
      ...state,
      one: null,
      isLoading: true
    };
  }
  if (action.type === SAVE_SUCCESS) {
    return {
      ...state,
      one: action.payload,
      isLoading: false
    };
  }

  if (action.type === SAVE_TASK_REQUEST) {
    return {
      ...state,
      task: null,
      isLoading: true
    };
  }
  if (action.type === SAVE_TASK_SUCCESS) {
    return {
      ...state,
      task: action.payload,
      isLoading: false
    };
  }
  if (action.type === CHANGE_NEW_ITEM_TEXT) {
    return {
      ...state,
      newItemText: action.payload
    };
  }

  if (action.type === SAVE_ITEM_REQUEST) {
    return {
      ...state,
      newItemText: ""
    };
  }
  if (action.type === SAVE_ITEM_SUCCESS) {
    return {
      ...state,
      list: [...state.list, action.payload]
    };
  }

  // if (action.type === ADD_NEW_ITEM) {
  //     return {
  //         ...state,
  //         newItemText: "",
  //         list: [
  //             ...state.list,
  //             {
  //                 id: getId().toString(),
  //                 text: state.newItemText,
  //                 isDone: false
  //             }
  //         ]
  //     };
  // }
  if (action.type === HANDLE_IS_DONE) {
    return {
      ...state,
      list: state.list.map(el => {
        if (el.id === action.payload.itemId) {
          return {
            ...el,
            isDone: action.payload.isDone
          };
        }
        return el;
      })
    };
  }
  if (action.type === CHANGE_TEXT) {
    return {
      ...state,
      list: state.list.map(el => {
        if (el.id === action.payload.itemId) {
          return {
            ...el,
            text: action.payload.text
          };
        }
        return el;
      })
    };
  }
  if (action.type === "SET_FILTER") {
    return {
      ...state,
      filter: action.payload
    };
  }
  if (action.type === DELETE_ITEM_SUCCESS) {
    return {
      ...state,
      list: state.list.filter(item => item.id !== action.payload)
    };
  }

  return state;
}

export function filterTodos(list, filter) {
  if (filter === "ACTIVE") {
    return list.filter(item => !item.isDone);
  }
  if (filter === "DONE") {
    return list.filter(item => item.isDone);
  }

  return list;
}
const stateSelector = state => state[moduleName];

export const isLoadingSelector = createSelector(
  stateSelector,
  state => state.isLoading
);

export const errorMessageSelector = createSelector(
  stateSelector,
  state => state.error && state.error.message
);

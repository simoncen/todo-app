//define the behaviour of changing the states

// the action to delete one of the to-do list(s)
export const deleteTodoList = (dispatch, deletedTodoList) => {
  dispatch({
    type: 'DELETE_TODO_LIST', // send it to the reducers
    deletedTodoList
  });
}

// the action to add a to-do item under a to-do list
let nextTodoItemId = 1;
export const addTodoItem = (dispatch, pendingTodoItem) => {
  const newTodoItem = {
    ...pendingTodoItem, // '...' means copying the pendingTodoItem from the parameter
    id: nextTodoItemId,
    completed: false
  };
  nextTodoItemId++;
  dispatch({
    type: 'ADD_TODO_ITEM', // send it to the reducers
    newTodoItem
  });
}

// the action to mark the current TodoItem as completed
export const toggleTodoItem = (dispatch, toggleTodoItem) => {
  dispatch({
    type: 'TOGGLE_TODO_ITEM',
    toggleTodoItem
  });
}

// the action to remove a to-do item under a to-do list
export const deleteTodoItem = (dispatch, deletedTodoItem) => {
  dispatch({
    type: 'DELETE_TODO_ITEM',
    deletedTodoItem
  });
}

// the action to add a to-do list on the TodoBoard
let nextTodoListId = 1;
export const addTodoList = (dispatch, pendingTodoList) => {
  const newTodoList = {
    ...pendingTodoList,
    id: nextTodoListId,
    todoItems: []
  };
  nextTodoListId++;
  dispatch({
    type: 'ADD_TODO_LIST', // send it to the reducers
    newTodoList
  });
}

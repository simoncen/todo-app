//define the behaviour of changing the states

// import axios from "axios";
import ApiClient from '../api/ApiClient'; // ApiClient is exported as an instance, the name could be different, but they are pointing to the same thing.
import history from '../history';
import { getCurrentUser } from '../utils/AuthUtils';

// the action to delete one of the to-do list(s)
export const deleteTodoList = (dispatch, deletedTodoList) => {
  // axios, replace all axios with Apiclient
    ApiClient
    .delete(`/list/${deletedTodoList.id}`) // with``, same as 'list' + deletedTodoList.id.toString(), not efficient with '+'
    .then(res => {
      dispatch({
        type: 'DELETE_TODO_LIST',
        deletedTodoList
      });
    })
    .catch(err => {
      // Todo: handle error
      dispatch({
        type: 'SEND_ALERT_INFO',
        alertInfo: {
          severity: 'error',
          message: err.response.data
        }
      });
    });
  // dispatch({
  //   type: 'DELETE_TODO_LIST', // send it to the reducers
  //   deletedTodoList
  // });
}

// the action to add a to-do item under a to-do list
// let nextTodoItemId = 1;
export const addTodoItem = (dispatch, pendingTodoItem) => {
  pendingTodoItem.completed = false;
  ApiClient
    .post("/item", pendingTodoItem) // send the pendingTodoList to the backend server with .post() with axios
    .then(res => { // the responce from the backend
      dispatch({
        type: 'ADD_TODO_ITEM',
        newTodoItem: res.data // the data from the responce
      });
    })
    .catch(err => {
      // Todo: handle error
      dispatch({
        type: 'SEND_ALERT_INFO',
        alertInfo: {
          severity: 'error',
          message: err.response.data
        }
      });
  });
  // const newTodoItem = {
  //   ...pendingTodoItem, // '...' means copying the pendingTodoItem from the parameter
  //   id: nextTodoItemId,
  //   completed: false
  // };
  // nextTodoItemId++;
  // dispatch({
  //   type: 'ADD_TODO_ITEM', // send it to the reducers
  //   newTodoItem
  // });
}

// the action to mark the current TodoItem as completed
export const toggleTodoItem = (dispatch, toggleTodoItem) => {
  toggleTodoItem.completed = !toggleTodoItem.completed;
  ApiClient
    .put(`/item/${toggleTodoItem.id}`, toggleTodoItem)
    .then(res => {
      dispatch({
        type: 'TOGGLE_TODO_ITEM',
        toggleTodoItem
      });
    })
    .catch(err => {
      // Todo: handle error
      dispatch({
        type: 'SEND_ALERT_INFO',
        alertInfo: {
          severity: 'error',
          message: err.response.data
        }
      });
    });
//   dispatch({
//     type: 'TOGGLE_TODO_ITEM',
//     toggleTodoItem
//   });
}

// the action to remove a to-do item under a to-do list
export const deleteTodoItem = (dispatch, deletedTodoItem) => {
  ApiClient // axios is a XMLHttpRequest
    .delete(`/item/${deletedTodoItem.id}`)
    .then(res => {
      dispatch({
        type: 'DELETE_TODO_ITEM',
        deletedTodoItem
      });
    })
    .catch(err => {
      // Todo: handle error
      dispatch({
        type: 'SEND_ALERT_INFO',
        alertInfo: {
          severity: 'error',
          message: err.response.data
        }
      });
    });
  // dispatch({
  //   type: 'DELETE_TODO_ITEM',
  //   deletedTodoItem
  // });
}

// the action to add a to-do list on the TodoBoard
// let nextTodoListId = 1;
export const addTodoList = (dispatch, pendingTodoList) => {
  const user = getCurrentUser();
  ApiClient
    .post("/list", {
      ...pendingTodoList,
      userId: user.id // only addTodoList and fetchTodoList need the userId, because for deleting and updating the todoList, only listId is needed
    }) // send the pendingTodoList to the backend server with .post() with axios
    .then(res => { // the responce from the backend
      dispatch({
        type: 'ADD_TODO_LIST',
        newTodoList: res.data // the data from the responce
      });
    })
    .catch(err => {
      // Todo: handle error
      dispatch({
        type: 'SEND_ALERT_INFO',
        alertInfo: {
          severity: 'error',
          message: err.response.data
        }
      });
    });
  // const newTodoList = {
  //   ...pendingTodoList,
  //   id: nextTodoListId,
  //   todoItems: []
  // };
  // nextTodoListId++;
  // dispatch({
  //   type: 'ADD_TODO_LIST', // send it to the reducers
  //   newTodoList
  // });
}

// the action to get to-do list when the user refresh the page, fetch data from the backend, two actions:
// fetch to do list start and fetch to do list success
export const fetchTodoList = (dispatch) => {
  // Step 1: set fetching status
  dispatch({
    type: 'FETCH_TODO_LIST_START'
  });

  // Step 2: fetch toto list
  const user = getCurrentUser();

  ApiClient
    .get(`/list?user_id=${user.id}`) // original: .get('list'), In a URL, the query starts with a question mark - the question mark is used as a separator, and is not part of the query string.
    .then(res => {
      dispatch({
        type: 'FETCH_TODO_LIST_SUCCESS',
        todoLists: res.data
      });
    })
    .catch(err => {
      // Todo: handle error
      // console.log(err);
      dispatch({
        type: 'SEND_ALERT_INFO',
        alertInfo: {
          severity: 'error',
          message: err.response.data
        }
      });
    });
}

// the action to clear the alert box after it appears
export const clearAlertInfo = (dispatch) => {
  dispatch({
    type: 'CLEAR_ALERT_INFO'
  });
}

export const signupUser = (dispatch, signupInput) => {
  ApiClient.post('/user/signup', signupInput)
    .then(response => {
      // todo redirect to login
      history.push('/login');
    })
    .catch(err => {
      dispatch({
        type: 'SEND_ALERT_INFO',
        alertInfo: {
          severity: 'error',
          message: err.response.data
        }
      });
    });
}

export const loginUser = (dispatch, loginInput) => {
  ApiClient.post('/user/login', loginInput)
    .then(response => {
      const { token } = response.data; // token is retrieved from userRoutes.js
      // With localstorage, web applications can store data locally within the user's browser. localStorage is a browser's object
      // localStorage object stores the data with no expiration date.
      // store the token data as jwtToken name with localStorage object
      localStorage.setItem('jwtToken', token); // （‘name’, value)
      dispatch({
        type: 'LOG_IN_SUCCESS' // set isLoggedIn = true in the reducers
      });
      // Todo: redirect to homepage
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: 'SEND_ALERT_INFO',
        alertInfo: {
          severity: 'error',
          message: err.response.data
        }
      });
    })
}

export const logoutUser = (dispatch) => {
  localStorage.removeItem('jwtToken');
  dispatch({
    type: 'LOG_OUT'
  });
  history.push('/login'); // push to the client side in the browser
}

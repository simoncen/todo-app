//execute actions and update states

//object in js and map in java

// default state for the app (belongs to the redux)

// defaultState is no longer needed because the state is extracted from the backend by calling the
// fetchTodoList action to get the updated todoList from the server

// const defaultState = {
//   todoLists: [
//    {
//      id: 0,
//      description: "First todoList",
//      todoItems: [ // change it to 'items' to keep it the same as backend for readability
//        {
//          id: 0,
//          description: "First totoItem",
//          completed: false,
//          todoListId: 0 // change it to 'listId' to items to keep it the same as backend for readability
//        },
//        {
//          id: 1,
//          description: "Second totoItem",
//          completed: false,
//          todoListId: 0
//        }
//      ]
//    }
//  ]
// }

export default (state = {}, action) => { // original: state = defaultState, now: state = {}
  switch (action.type) {

    case 'DELETE_TODO_LIST': {
      const { deletedTodoList } = action;
      let todoLists = state.todoLists.filter(todoList => todoList.id !== deletedTodoList.id) // if not equavalanet, then keep it
      return {
        ...state,
        todoLists
      }
    }

    case 'ADD_TODO_ITEM': {
      const { newTodoItem } = action;
      let todoLists = state.todoLists.map((todoList, index) => {
        if (todoList.id === newTodoItem.listId) { // a new item is added to the original todoList, change todoListId to listId
          todoList.items.push(newTodoItem); // change todoItems to items
        }
        return Object.assign({}, todoList); // a new todoList object is cloned (new updated todoList Object)
      });
      return {
        ...state,
        todoLists
      }
    }

    case 'TOGGLE_TODO_ITEM': {
      const { toggleTodoItem } = action;
      let todoLists = state.todoLists.map((todoList, index) => {
        if (todoList.id === toggleTodoItem.listId ){
         let todoItems = todoList.items.map((todoItem, index) => {
          if (todoItem.id === toggleTodoItem.id){
            todoItem.completed = toggleTodoItem.completed;
          }
          return todoItem; // todoItem is each element in the todoList array
         });
         todoList.items = todoItems; // assign the updated todoItems to the todoList
        }
        return Object.assign({}, todoList);
      });
      return {
        ...state,
        todoLists
      }
    }

    case 'DELETE_TODO_ITEM': {
      const { deletedTodoItem } = action;
      let todoLists = state.todoLists.map((todoList, index) => {
        if (todoList.id === deletedTodoItem.listId ){
         let todoItems = todoList.items.filter(todoItem => todoItem.id !== deletedTodoItem.id)
         todoList.items = todoItems; // assign the updated todoItems to the todoList
        }
        return Object.assign({}, todoList);
      });

      return {
        ...state,
        todoLists // todoLists: todoLists (key and value are the same)
      }
    }

    case 'ADD_TODO_LIST': {
      const { newTodoList } = action;
      let todoLists = state.todoLists;
      todoLists.push(newTodoList);
      return {
        ...state,
        todoLists: Object.assign([], todoLists)
      }
    }

    case 'FETCH_TODO_LIST_START': {
      return {
        ...state,
        isFetchingTodoList: true // isFetchingTodoList is a flag (a field of the object)
      }
    }

    case 'FETCH_TODO_LIST_SUCCESS': {
      // todoLists is fetched from action which is from the backend
      const { todoLists } = action;
      return {
        ...state,
        todoLists,
        isFetchingTodoList: false
      }
    }

    case 'CLEAR_ALERT_INFO': {
      return {
        ...state,
        alertInfo: undefined
      }
    }

    case 'SEND_ALERT_INFO': {
      const { alertInfo } = action;
      return {
        ...state,
        alertInfo,
        isFetchingTodoList: false
      }
    }

    case 'LOG_IN_SUCCESS': {
     return {
       ...state,
       isLoggedIn: true
     }
    }

    case 'LOG_OUT': {
     return {
       ...state,
       isLoggedIn: false
     }
    }

    default:
      return state
  }
}

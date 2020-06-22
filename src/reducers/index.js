//execute actions and update states

//object in js and map in java

// default state for the app (belongs to the redux)
const defaultState = {
  todoLists: [
   {
     id: 0,
     description: "First todoList",
     todoItems: [
       {
         id: 0,
         description: "First totoItem",
         completed: false,
         todoListId: 0
       },
       {
         id: 1,
         description: "Second totoItem",
         completed: false,
         todoListId: 0
       }
     ]
   }
 ]
}

export default (state = defaultState, action) => {
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
        if (todoList.id === newTodoItem.todoListId) { // a new item is added to the original todoList
          todoList.todoItems.push(newTodoItem);
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
        if (todoList.id === toggleTodoItem.todoListId ){
         let todoItems = todoList.todoItems.map((todoItem, index) => {
          if (todoItem.id === toggleTodoItem.id){
            todoItem.completed = todoItem.completed === false ? true : false;
          }
          return todoItem; // todoItem is each element in the todoList array
         });
         todoList.todoItems = todoItems; // assign the updated todoItems to the todoList
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
        if (todoList.id === deletedTodoItem.todoListId ){
         let todoItems = todoList.todoItems.filter(todoItem => todoItem.id !== deletedTodoItem.id)
         todoList.todoItems = todoItems; // assign the updated todoItems to the todoList
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

    default:
      return state
  }
}

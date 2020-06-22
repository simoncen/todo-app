import React, {Component} from 'react';
import { connect } from "react-redux";
// material ui
import Box from '@material-ui/core/Box';
// import the TodoList component
import TodoList from "./TodoList";
// import the AddTodoItem component
import AddTodoList from "./AddTodoList";
// import actions
import { addTodoList } from '../actions/index';

const styles = {
  todoLists: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    overflowY: "scroll"
  }
}

class TodoBoard extends Component {
  constructor(props) {
    super(props);

    this.createTodoList = this.createTodoList.bind(this);
  }

  createTodoList(pendingTodoList) {
    const { todoList } = this.props;
    this.props.addTodoList(pendingTodoList);
  }

  renderTodoList() {
    let { todoLists } = this.props; //todoLists as props as stated down below with mapStateToProps
    const todoListsGrid = (todoLists.map((todoList, idx) => {
      return (
        <TodoList todoList={todoList}/>
      )
    }));
    return (
      <div style={styles.todoLists}>
        {todoListsGrid}
        <AddTodoList
          onCreation={this.createTodoList} // passed from the AddTodoItem component
          placeholder={"Add another list"}
        />
      </div>
    )

  }

  render() {
    return (
      // calling the method from above
      <Box component="div">
        {this.renderTodoList()}
      </Box>
    )
  }
}

// state of the redux
// get the updated todoLists from the state
const mapStateToProps = state => ({
  // assign the todoLists from the global state from the reducer to todoLists props
  todoLists: state.todoLists
});

const mapDispatchToProps = (dispatch) => ({
  addTodoList: (pendingTodoList) => addTodoList(dispatch, pendingTodoList)
});

// connect react component's prop to redux global store.
//use connect function from react-redux (https://react-redux.js.org/api/connect)
//to connect react component to redux store.
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoBoard);

import React, {Component} from 'react';
import { connect } from "react-redux";
// material ui
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
// import the TodoList component
import TodoList from "./TodoList";
// import the AddTodoItem component
import AddTodoList from "./AddTodoList";
// import actions
import { addTodoList, fetchTodoList, clearAlertInfo } from '../actions/index';

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
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }

  createTodoList(pendingTodoList) {
    const { todoList } = this.props;
    this.props.addTodoList(pendingTodoList);
  }

  handleAlertClose() {
    this.props.clearAlertInfo();
  }

  componentDidMount() {
    this.props.fetchTodoList();
  }

  renderFetching() {
    return (
      <LinearProgress color="secondary" />
    )
  }

  // Add render alert inside render function
  renderAlert() {
    const { alertInfo } = this.props;
    if (alertInfo) {
      return (
        <Snackbar open autoHideDuration={6000} onClose={this.handleAlertClose}>
          <Alert variant="filled" severity={alertInfo.severity} onClose={this.handleAlertClose}>
            {alertInfo.message}
          </Alert>
        </Snackbar>
      )
    }
  }

  renderTodoList() {
    const { todoLists } = this.props; //todoLists as props as stated down below with mapStateToProps
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
    const { isFetchingTodoList } = this.props;
    return (
      // calling the method from above
      <Box component="div"> {/* Box acts like a div or span for a specific css style, it's not resizable like span */}
        {this.renderAlert()}
        {isFetchingTodoList ? this.renderFetching() : this.renderTodoList()}
      </Box>
    )
  }
}

// state of the redux
// get the updated todoLists from the state
const mapStateToProps = state => ({
  // assign the todoLists from the global state from the reducer to todoLists props
  todoLists: state.todoLists || [], // todoLists is updated with fetchingTodoList()
  isFetchingTodoList: state.isFetchingTodoList,
  alertInfo: state.alertInfo
});

const mapDispatchToProps = (dispatch) => ({
  addTodoList: (pendingTodoList) => addTodoList(dispatch, pendingTodoList),
  fetchTodoList: () => fetchTodoList(dispatch),
  clearAlertInfo: () => clearAlertInfo(dispatch)
});

// connect react component's prop to redux global store.
//use connect function from react-redux (https://react-redux.js.org/api/connect)
//to connect react component to redux store.
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoBoard);

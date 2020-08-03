import React, {Component} from 'react';
import { connect } from "react-redux";
// material ui
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
// import the AddTodoItem components
import AddTodoItem from './AddTodoItem'
// actions
import { addTodoItem, deleteTodoList, deleteTodoItem, toggleTodoItem } from '../actions/index';

const styles = {
  todoListContainer: {
    margin: 16,
    height: "100%",
    width: 300,
    bottom: 0
  },
  totoListTitle: {
    padding: 16
  },
  todoListBox: {
    height: "100%"
  },
  completedTodoItem: {
    textDecoration: "line-through"
  }
}

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null //position, anchorEl(anchorElement)
    };

    this.createTodoItem = this.createTodoItem.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
    this.toggleTodoItem = this.toggleTodoItem.bind(this);
    this.deleteTodoList = this.deleteTodoList.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    // same as this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  // the props is passed from the action, which get the checked box marked as completed
  toggleTodoItem(todoItem) {
    this.props.toggleTodoItem(todoItem);
  }


  deleteTodoItem(todoItem) {
    this.props.deleteTodoItem(todoItem);
  }

  deleteTodoList(todoList) {
    this.props.deleteTodoList(todoList); // todoList is the same as deletedTodoList
  }

  // callback function in the IconButton under renderTodoListTitle()
  handleMenuClick(event) { // same as handleMenuClick = (event) =>{...}
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleMenuClose() {
    this.setState({
      anchorEl: null
    });
  }

  createTodoItem(pendingTodoItem) {
    const { todoList } = this.props;
    pendingTodoItem.listId = todoList.id; // changed todoListId to listId in order to match the naming of the API in itemRoutes
    this.props.addTodoItem(pendingTodoItem);
  }


  // called by the renderTodoItem() function
  // todoItem is passed from the reducers
  renderTodoItem(todoItem) {
    const todoItemDisplay = todoItem.completed ? (
      <p style={styles.completedTodoItem}>{todoItem.description}</p>
    ) : (
      <p>{todoItem.description}</p>
    );
    return (
      <ListItem divider={true}>
        <Checkbox
          onClick={() => this.toggleTodoItem(todoItem)}
          checked={todoItem.completed}
          disableRipple
        />
        <ListItemText
          primary={todoItemDisplay}
        />
        <IconButton aria-label="Delete Todo" onClick={() => this.deleteTodoItem(todoItem)}>
          <DeleteOutlined />
        </IconButton>
      </ListItem>
    );
  }

  // called by the main render() function
  renderTodoItems() {
    const { todoList } = this.props;
    const todoItems = todoList.items || []; // original: todoList.todoItems || [], now: todoList.items || []
    return (
        todoItems.map((todoItem) => {
          return this.renderTodoItem(todoItem);
        })
    );
  }

  // called by the main render() function
  renderTodoListTitle(){
    const { todoList } = this.props;
    const { anchorEl } = this.state; // grab the anchorEl from the state
    return (
      <ListItem>
        <ListItemText
          primary={
            <Typography variant="h6" style={styles.totoListTitle}>
              {todoList.description}
            </Typography>
          }
        />
        <IconButton aria-label="Delete Todo" onClick={this.handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl} // front is the props from the menu component in material ui, rear is the value
          keepMounted
          open={Boolean(anchorEl)} // show the delete icon if open returns true
          onClose={this.handleMenuClose} // set anchorEl to null
        >
          <MenuItem onClick={() => this.deleteTodoList(todoList)}>Delete</MenuItem>
        </Menu>
      </ListItem>
    );
  }

  render() {
    return (
      <Box component="div" style={styles.todoListBox}>
        <Paper style={styles.todoListContainer}>
          {this.renderTodoListTitle()}
          {this.renderTodoItems()}
          <AddTodoItem
            onCreation={this.createTodoItem} // passed from the AddTodoItem component
            placeholder={"Add todo item"}
          />
        </Paper>
      </Box>
    )

  }
}

const mapStateToProps = state => ({});
// send to actions
const mapDispatchToProps = (dispatch) => ({
  addTodoItem: (pendingTodoItem) => addTodoItem(dispatch, pendingTodoItem),
  deleteTodoList: (deletedTodoList) => deleteTodoList(dispatch, deletedTodoList),
  deleteTodoItem: (todoItem) => deleteTodoItem(dispatch, todoItem),
  toggleTodoItem: (todoItem) => toggleTodoItem(dispatch, todoItem)
});

export default connect(
  mapStateToProps, // value
  mapDispatchToProps, // actions
)(TodoList);

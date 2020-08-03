import React, { Component } from "react";
import { connect } from "react-redux";
// material ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Paper from "@material-ui/core/Paper";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  addTodoItemCollapse: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    opacity: "0.5",
  },
  addButton: {
    backgroundColor: "#5aac44",
    color: "white"
  },
  addInput: {
    width: "270px"
  },
}

class AddTodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOpen: false,
      description: ""
    };

    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  openForm() {
    this.setState({
      formOpen: true
    });
  }

  closeForm() {
    this.setState({
      formOpen: false
    });
  }

  handleKeyPress(e){
    const code = e.which || e.keyCode;  // which is the same as keyCode, but which and keyCode are suitable for different browser
    if (code === 13){
      this.handleCreation();
    } // create new item
  }

  handleInputChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleCreation() {
    const pending = { // pending will be passed as pendingTodoItem in TodoList component
      description: this.state.description
    };
    this.props.onCreation(pending); // trigger the onCreation function from the TodoList component
    this.setState({ // reset the description to empty
      formOpen: false,
      description: ""
    });
  }

  render() {
    const { description, formOpen } = this.state;
    const { placeholder } = this.props;
    if (formOpen) {
      return (
        <Paper>
          <ListItem>
            <Box component="div" onBlur={this.closeForm}>
              <TextField
                fullWidth
                multiline
                autoFocus
                variant="outlined"
                style={styles.addInput}
                placeholder={placeholder} // from TodoList component(addTodoItem tag)
                value={description}
                onChange={this.handleInputChange} // the user write down the name of the item's name
                onKeyPress={this.handleKeyPress} // for pressing the enter key on the keyboard
              />
              <Box component="div" mt={2}>
                <Button variant="contained" style={styles.addButton} onMouseDown={this.handleCreation}>
                  Add
                </Button>
              </Box>
            </Box>
          </ListItem>
        </Paper>
      );
    }

    return (
      <Paper>
        <ListItem style={styles.addTodoItemCollapse}>
          <IconButton aria-label="Add Todo" onClick={this.openForm}>
            <AddIcon />
          </IconButton>
          <ListItemText primary={placeholder} onClick={this.openForm}/>
        </ListItem>
      </Paper>
    );
  }
}

export default connect()(AddTodoItem);

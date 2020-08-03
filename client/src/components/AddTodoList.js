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
  addTodoListCollapse: {
    display: "flex",
    width: "300px",
    height: "50px",
    alignItems: "center",
    cursor: "pointer",
    opacity: "0.2",
    margin: "16px"
  },
  addTodoListExpand: {
    opacity: "1",
    display: "flex",
    margin: "16px",
    height: "150px",
    width: "300px"
  },
  addButton: {
    backgroundColor: "#5aac44",
    color: "white"
  },
  addInput: {
    width: "270px"
  }
}

class AddTodoList extends Component {
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

  handleInputChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleKeyPress(e){
    const code = e.which || e.keyCode; 
    if (code === 13){
      this.handleCreation();
    }
  }

  handleCreation() {
    const pending = { // pending will be passed as pendingTodoList in TodoBoard component
      description: this.state.description
    };
    this.props.onCreation(pending); // trigger the onCreation prop from the TodoBoard component
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
        <Paper style={styles.addTodoListExpand} >
          <ListItem>
            <Box component="div" onBlur={this.closeForm}> {/*onBlur represent the focus on the screen, meaning where your cursor has been located*/}
              <TextField
                fullWidth
                multiline
                autoFocus
                variant="outlined"
                style={styles.addInput}
                placeholder={placeholder} // from TodoBoard component(AddTodoList tag)
                value={description}
                onChange={this.handleInputChange} // the user write down the name of the item's name
                onKeyPress={this.handleKeyPress}
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
      <Paper style={styles.addTodoListCollapse}>
          <IconButton aria-label="Add Todo" onClick={this.openForm}>
            <AddIcon />
          </IconButton>
          <ListItemText primary={placeholder} onClick={this.openForm}/>
      </Paper>
    );
  }
}

export default connect()(AddTodoList);

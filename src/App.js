import React, { Component } from "react";
import './App.css';
// react router
import { Router, Route } from "react-router-dom"; //manage the url ontop of the website
import { createBrowserHistory as createHistory } from 'history'
// redux
import {Provider} from "react-redux";
import store from "./store";
// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// components
import TodoBoard from "./components/TodoBoard";

const styles = {
  title: {
    flex: 1
  },
  appbar: {
    backgroundColor: "#026aa7"
  },
  content: {
    backgroundColor: "#0079bf"
  }
}

const history = createHistory(); 

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <AppBar position="static" style={styles.appbar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={styles.title}>
                Todo list
              </Typography>
            </Toolbar>
          </AppBar>
         <Route path="/" exact component={TodoBoard} />
        </Router>
      </Provider>
    );
  }
}


export default App;

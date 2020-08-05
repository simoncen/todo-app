import React, { Component } from "react";
import './App.css';
// react router
import { Router, Route } from "react-router-dom"; //manage the url ontop of the website // '{}' means importing a variable or a part from the specified file
import history from './history'; // history is the same as createBrowserHistory()
// redux
import {Provider} from "react-redux"; // makes the Redux store available to any nested components that have been wrapped in the connect() function
import store from "./store";
// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// components
import TodoBoard from "./components/TodoBoard";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import PrivateRoute from './components/private-route/PrivateRoute'; // no '{}' means importing the default part of the file
import UserAvatar from './components/UserAvatar'; // '' is preferred over ""
// for google analytics
import ReactGA from 'react-ga';

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

function initializeReactGA() { // are there any other ways to write this???
    ReactGA.initialize('UA-174542858-1');
    ReactGA.pageview('/homepage');
}


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
              <UserAvatar/>
            </Toolbar>
          </AppBar>
         {/*<Route path="/" exact component={TodoBoard} />*/}
         <PrivateRoute exact path="/" component={TodoBoard} /> {/*exact means exactly match */}
         <Route exact path="/signup" component={Signup} />
         <Route exact path="/login" component={Login} />
        </Router>
      </Provider>
    );
  }
}


export default App;

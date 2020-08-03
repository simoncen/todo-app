import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../history";
// material ui
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
// utils
import { getCurrentUser } from "../utils/AuthUtils";
import { logoutUser } from "../actions/index";

class UserAvatar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    }

    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleLoginClick() {
    history.push("/login");
  }

  handleSignupClick() {
    history.push("/signup");
  }

  handleLogoutClick() {
    this.props.logoutUser();
    this.setState({
      anchorEl: null
    });
  }

  handleMenu(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose() {
    this.setState({
      anchorEl: null
    });
  }

  render() {
    const { anchorEl } = this.state; // anchorEl default state is undefined
    const { isLoggedIn } = this.props;
    const isMenuOpen = anchorEl && anchorEl != null; // check whether anchorEl has a value and whether it is not equal to null
    //  the flag(props) isLoggedIn need to be passed in because its state needs to be triggered and changed so that the page can be rerendered in react and redux
    // debugger;
    if (getCurrentUser() === undefined && !isLoggedIn) { // the first isLoggedIn() function is passed in from AuthUtils to confirm whether it receives the token, the second is passed in from reducers LOG_IN_SUCCESS dispatched from actions loginUser used by the Login.js
      return (
        <div>
          <Button color="inherit" onClick={this.handleLoginClick}>Login</Button>
          <Button color="inherit" onClick={this.handleSignupClick}>Signup</Button>
        </div>
      );
    } else {
      return (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle/>
         </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleLogoutClick}>Log Out</MenuItem>
          </Menu>
        </div>

      );
    }
  };
}

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => logoutUser(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAvatar);

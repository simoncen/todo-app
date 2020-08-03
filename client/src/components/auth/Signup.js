import React, { Component } from 'react';
import { connect } from "react-redux";
// material ui
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// actions
import { signupUser, clearAlertInfo } from '../../actions/index';

const styles = {
  container: {
    marginTop: 32,
    padding: 16
  },
  buttonColor: {
    backgroundColor: '#1976d2'
  }
}

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleAlertClose = this.handleAlertClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleAlertClose() {
    this.props.clearAlertInfo();
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit(e) {
    const signupInput = {
      email: this.state.email,
      password: this.state.password
    };
    // call server to signup
    this.props.signupUser(signupInput);
  };

  renderAlert() {
    const { alertInfo } = this.props; // this.props has to be json
    if (alertInfo) {
      return (
        <Snackbar open autoHideDuration={6000} onClose={this.handleAlertClose}>
          <Alert variant="outlined" severity={alertInfo.severity} onClose={this.handleAlertClose}>
            {alertInfo.message}
          </Alert>
        </Snackbar>
      )
    }
  }

  render() {
    return (
      <Container maxWidth='sm'>
        <Paper style={styles.container}>
          {this.renderAlert()}
          {/* grid is resizalbe according to the size of the webpage */}
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
            spacing={3}
          >
            <Grid container item sm={6} spacing={100}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                onChange={this.onChange}
              />
            </Grid>
            <Grid container item sm={6} spacing={100}>
              <TextField
                required
                fullWidth
                id='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                onChange={this.onChange}
              />
            </Grid>
            <Grid container item justify='center' alignItems='center' sm={12} spacing={100}>
              <Button variant='contained' color='primary' onClick={this.onSubmit} style={styles.buttonColor}>
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  alertInfo: state.alertInfo
});

const mapDispatchToProps = (dispatch) => ({
  signupUser: (signupInput) => signupUser(dispatch, signupInput),
  clearAlertInfo: () => clearAlertInfo(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);

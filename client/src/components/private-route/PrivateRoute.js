// PrivateRoute is used as Route in the App.js component under the src file

import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../../utils/AuthUtils";

const PrivateRoute = ({ component: Component, ...rest }) => ( // PrivateRoute is used in App.js to serve as the Route component, the component prop {TodoBoard} is passed as 'Component', and the rest "...rest" is passed in as well
  <Route
    {...rest} // in this case, exact path = '/' from App.js
    render={props => // render is a property of <Route>, props are the properties of {TodoBoard} (could be the properties of other component depending on what is passed in)
    isLoggedIn() === true ? (
        <Component {...props} /> // ...props is using the props from TodoBoard
      ) : (
        <Redirect to="/login" /> // default when the user enters the webstie
      )
    }
  />
)

export default PrivateRoute;

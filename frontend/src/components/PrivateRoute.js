import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../state/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authState } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
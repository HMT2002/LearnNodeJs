import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  return (
    <Fragment>
      <Route />
    </Fragment>
  );
};

export default ProtectedRoute;

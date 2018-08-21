import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  layout_type : Layout,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
          <Redirect to="/login" />
        )
    )} />
  );

const mapStateToProps = ({user}) => ({
  isAuthenticated: !!user.uid
});

export default connect(mapStateToProps)(PrivateRoute);

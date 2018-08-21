import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  layout_type : Layout,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
         <Layout>
           <Component {...props} />
         </Layout>
        )
    )} />
  );

const mapStateToProps = ({user}) => ({
  isAuthenticated: !!user.uid
});

export default connect(mapStateToProps)(PublicRoute);
//export default PublicRoute;
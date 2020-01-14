import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import Base from '../Base';

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

PublicRoute.propTypes = {
};

export default PublicRoute;

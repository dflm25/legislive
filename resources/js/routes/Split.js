import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';

const SplitRoute = ({
  component: Component, fallback: Fallback, isAuthenticated, layout: Layout, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
        isAuthenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Layout>
            <Fallback {...props} />
          </Layout>
        )
    )}
  />
);

SplitRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(SplitRoute);

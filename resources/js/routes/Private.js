import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
// import Base from '../Base';
import { getUserCompany } from '../utils/session';

let companies = (getUserCompany() !== null) ? getUserCompany().length : 0;

const PrivateRoute = ({ component: Component, isAuthenticated, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
        if (isAuthenticated) {
          if (companies > 1 && props.location.pathname !== '/select-company') {
            return <Redirect to={{
                  pathname: '/select-company',
                  state: { from: props.location },
              }}
            />
          } else {
            return <Layout>
                <Component {...props} />
              </Layout>
          }
        } else {
          return <Redirect to={{
                pathname: '/login',
                state: { from: props.location },
            }}
          />
        }
      }
    }
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);

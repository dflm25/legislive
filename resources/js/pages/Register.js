import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classNames from 'classnames';
import { register } from '../services/authService';

class Register extends Component {
  constructor() {
    super();

    this.validator = new ReeValidate({
      username: 'required|min:3',
      email: 'required|email',
      password: 'required|min:6',
      password_confirmation: 'required|min:6',
    });

    this.state = {
      loading: false,
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
      success: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // If a field has a validation error, we'll clear it when corrected.
    const { errors } = this.state;
    if (name in errors) {
      const validation = this.validator.errors;
      this.validator.validate(name, value).then(() => {
        if (!validation.has(name)) {
          delete errors[name];
          this.setState({ errors });
        }
      });
    }
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    const validation = this.validator.errors;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

    this.validator.validate(name, value).then(() => {
      if (validation.has(name)) {
        const { errors } = this.state;
        errors[name] = validation.first(name);
        this.setState({ errors });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      username, email, password, password_confirmation,
    } = this.state;
    const credentials = {
      username,
      email,
      password,
      password_confirmation,
    };

    // Set response state back to default.
    this.setState({ response: { error: false, message: '' } });

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
          this.setState({ loading: true });
          this.submit(credentials);
        }
      });
  }

  submit(credentials) {
    this.props.dispatch(register(credentials))
      .then(() => {
        this.registrationForm.reset();
        this.setState({ loading: false, success: true });
      })
      .catch((err) => {
        const value = err.data.errors;
        const error = [];
        const errors = value.map( (i, key) => {
          error[i.field] = i.message
        });
        
        const response = {
          error: true,
          message: err.data.msg,
        };
        this.setState({ loading: false, ...response, errors: error });
      });
  }

  render() {
    // If user is already authenticated we redirect to dashboard.
    if (this.props.isAuthenticated) {
      return <Redirect to="/" replace />;
    }

    const { response, errors, loading } = this.state;

    return (
      <div>
        <div className="d-flex flex-column flex-row align-content-center py-5">
          <div className="container">
            <div className="row">
              <div className="section-login col-lg-12 ml-auto mr-auto">

                <h4>Register</h4>

                    {response.error &&
                      <div className="alert alert-danger text-center" role="alert">
                        { response.message }
                      </div>
                    }

                    {this.state.success &&
                      <div className="alert alert-success text-center" role="alert">
                        Registration successful.<br />
                        <Link to="/" href="/">Please log in with your new email and password.</Link>
                      </div>
                    }

                    {!this.state.success &&
                    <form className="form-horizontal" method="POST" onSubmit={this.handleSubmit} ref={(el) => { this.registrationForm = el; }}>

                      <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                          id="username"
                          type="name"
                          name="username"
                          className={classNames('form-control', {
                            'is-invalid': ('username' in errors),
                          })}
                          placeholder="Enter username"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />

                        {('username' in errors) &&
                        <div className="invalid-feedback">{ errors.username }</div>
                        }
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className={classNames('form-control', {
                            'is-invalid': ('email' in errors),
                          })}
                          placeholder="Enter email"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />

                        {('email' in errors) &&
                        <div className="invalid-feedback">{ errors.email }</div>
                        }
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          className={classNames('form-control', {
                            'is-invalid': ('password' in errors),
                          })}
                          name="password"
                          placeholder="Enter password"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />
                        {('password' in errors) &&
                        <div className="invalid-feedback">{ errors.password }</div>
                        }
                      </div>

                      <div className="form-group">
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input
                          id="password_confirmation"
                          type="password"
                          className={classNames('form-control', {
                            'is-invalid': ('password_confirmation' in errors),
                          })}
                          name="password_confirmation"
                          placeholder="Confirm password"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={loading}
                        />
                        {('password_confirmation' in errors) &&
                        <div className="invalid-feedback">{ errors.password_confirmation }</div>
                        }
                      </div>

                      <div className="form-group text-center">
                        <button
                          type="submit"
                          className={classNames('btn btn-primary', {
                            'btn-loading': loading,
                          })}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    }

                {!this.state.success &&
                <div className="password-reset-link text-center">
                  <Link to="/" href="/">
                    Already registered? Log in.
                  </Link>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Register);

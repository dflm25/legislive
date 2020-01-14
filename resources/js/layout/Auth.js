import React from 'react';
import { connect } from 'react-redux';
import { timeText } from '../utils';

const Auth = ({ children }) => (
    <div id="app">
        <section className="section">
        <div className="d-flex flex-wrap align-items-stretch">
            <div className="col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white">
                <div className="p-4 m-3">
                    <div className="text-center">
                        <img src="./img/logo.svg" alt="logo" width="320" className="mb-5 mt-2" />
                    </div>
                    <h4 className="text-dark font-weight-normal">LAE - Virtual Fair</h4>
                    <p className="text-muted">Before you get started, you must login or register if you don't already have an account.</p>
                    {children}
                    <div className="text-center mt-5 text-small">
                        Copyright &copy; www.lae-edu.com Made with 💙 by LAE
                        <div className="mt-2">
                            <a href="#">Privacy Policy</a>
                            <div className="bullet"></div>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8 col-12 order-lg-2 order-1 min-vh-100 background-walk-x position-relative overlay-gradient-bottom" 
                style={{ background: "url('./img/background.jpeg') no-repeat", backgroundSize: 'cover'  }}
            >
            <div className="absolute-bottom-left index-2">
                <div className="text-light p-5 pb-2">
                    <div className="mb-5 pb-3">
                        <h1 className="mb-2 display-4 font-weight-bold">{timeText()}</h1>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
);
const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Auth);
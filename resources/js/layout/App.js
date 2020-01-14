import React, { useState } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SuperModal from '../components/SuperModal';

const App = (props) => {

  return <div id="app">
          <div className="main-wrapper">
            <div className="navbar-bg"></div>
              <Header />
              <Sidebar />
              <div className="main-content">
                <section className="section">
                  <div className="section-header">
                    <h1>{ props.title }</h1>
                  </div>
                  <div className="section-body">
                    {props.children}
                  </div>
                </section>
              </div>
              <SuperModal />
              <Footer />
          </div>
        </div>
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  title: state.title
});

export default connect(mapStateToProps)(App);
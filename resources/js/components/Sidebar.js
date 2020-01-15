import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/actions';
import Http from '../../js/Http';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      rooms: [],
    };
    this.api = '/get-rooms';
  }

  async componentDidMount () {
    /*Http.get(this.api)
    .then((response) => {
      const { data } = response;
      this.setState({ rooms: data });
    })
    .catch(() => {
      this.setState({
        error: 'Unable to fetch data.',
      });
    });*/
  }

  render() {
    // style={{ display: 'none' }}
    let { rooms } = this.state
    return (
        <div className="main-sidebar">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <a href="index.html"><img src="./img/logo.svg" style={{ width: '90%', maxWidth: '140px' }} /></a>
                    <br />
                </div>
                <div className="sidebar-brand sidebar-brand-sm">
                    <a href="index.html"><img src="./img/logo-mini.jpg" style={{ width: '90%', maxWidth: '80px' }} /></a>
                    <br />
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header"></li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link has-dropdown"><i className="fas fa-layer-group"></i><span>SetUp</span></a>
                      <ul className="dropdown-menu">
                        {
                          rooms.map(function (result) {
                            return <li key={`channels-${result.id}`}>
                              <a className="nav-link" data-to={ result.id }>{ result.name }</a>
                            </li>
                          })
                        }
                      </ul>
                    </li>
                    <li className="menu-header">Starter</li>
                </ul>
            </aside>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Sidebar);

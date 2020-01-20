import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_public_rooms } from '../services/roomsService';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      roomsPublic: [],
      roomsPrivate: []
    };
  }

  async componentDidMount () {
    let rooms = await get_public_rooms();
    this.setState({ roomsPublic: rooms.public, roomsPrivate: rooms.private });
  }

  render() {
    // 
    let { roomsPrivate, roomsPublic } = this.state
    return (
        <div className="main-sidebar">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <Link to={`/`}>
                      <img src="./img/logo.svg" style={{ width: '90%', maxWidth: '140px' }} />
                    </Link>
                    <br />
                </div>
                <div className="sidebar-brand sidebar-brand-sm">
                    <Link to={`/`}>
                      <img src="./img/logo-mini.jpg" style={{ width: '90%', maxWidth: '80px' }} />
                    </Link>
                    <br />
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header"></li>
                    <li className="nav-item dropdown">
                      <a href="#" className="nav-link has-dropdown"><i className="fas fa-layer-group"></i><span>SetUp</span></a>
                      <ul className="dropdown-menu">
                        
                      </ul>
                    </li>
                    <li className="menu-header">Grupos publicos</li>
                    {
                      roomsPublic.map(function (result) {
                        return <li key={`channels-${result.id}`}>
                          <Link className="nav-link" to={`/room/${result.id}`}>{ result.name }</Link>
                        </li>
                      })
                    }
                    <li className="menu-header">Grupos privados</li>
                    {
                      roomsPrivate.map(function (result) {
                        return <li key={`channels-${result.id}`}>
                          <Link className="nav-link" to={`/room/${result.id}`}>{ result.name }</Link>
                        </li>
                      })
                    }
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

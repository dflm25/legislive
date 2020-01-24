import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Switch from "react-switch";
import { get_public_rooms } from '../services/roomsService';
import { update_status } from '../services/dashboardService';
import { host } from '../utils/index';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      roomsPublic: [],
      roomsPrivate: [],
      checked: false
    };
    this.handleStatus = this.handleStatus.bind(this);
  }

  async componentDidMount () {
    let rooms = await get_public_rooms();
    this.setState({ roomsPublic: rooms.public, roomsPrivate: rooms.private });
  }

  async handleStatus () {
    this.setState({ checked: !this.state.checked })
    update_status(!this.state.checked);
  }

  render() {
    let { roomsPrivate, roomsPublic } = this.state
    let { currentInfo } = this.props
    
    return (
        <div className="main-sidebar">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <Link to={`/`}>
                      <img 
                      src={(currentInfo.picture !== null) ? currentInfo.picture : `${host}/img/user.png` }
                      style={{ width: '90%', maxWidth: '140px' }} 
                    />
                    </Link>
                    <br />
                    <strong style={{ verticalAlign: 'super' }}>Estado: </strong>
                    <Switch 
                      onChange={this.handleStatus} 
                      checked={this.state.checked} 
                      className="react-switch"
                      height={18}
                      width={40}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                </div>
                <div className="sidebar-brand sidebar-brand-sm">
                    <Link to={`/`}>
                      <img src={`${host}/img/user.png`} style={{ width: '90%', maxWidth: '80px' }} />
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
  currentInfo: state.currentInfo
});

export default connect(mapStateToProps)(Sidebar);

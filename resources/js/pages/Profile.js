import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormProfile } from '../components/forms/profile';
import { Password } from '../components/forms/password';
import { get_profile } from '../services/authService';
import { host } from '../utils/index';
import { get_user } from '../utils/session';

const Profile = (props) => {
    const [error, setError] = useState('')
    const [profile, setProfile] = useState([])

    useEffect(() => {
        async function get_info () {
            let response = await get_profile();
            setProfile(response);
        }

        get_info();
    }, [])

    return <div className="py-5">
            { error && <div className="text-center"><p>{error}</p></div> }
            <div className="section-body">
                <h2 className="section-title">{profile.username}</h2>
                <p className="section-lead">{profile.description}</p>

                <div className="row mt-sm-4">
                    <div className="col-12 col-md-12 col-lg-5">
                        <div className="card profile-widget">
                            <div className="profile-widget-header">
                                <img alt="image" src={`${host}/img/user.png`} className="rounded-circle profile-widget-picture" />
                                <div className="profile-widget-items">
                                    <div className="profile-widget-item">
                                        <div className="profile-widget-item-label">Posts</div>
                                        <div className="profile-widget-item-value">187</div>
                                    </div>
                                    <div className="profile-widget-item">
                                        <div className="profile-widget-item-label">Followers</div>
                                        <div className="profile-widget-item-value">6,8K</div>
                                    </div>
                                    <div className="profile-widget-item">
                                        <div className="profile-widget-item-label">Following</div>
                                        <div className="profile-widget-item-value">2,1K</div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-widget-description">
                                <div className="profile-widget-name">{profile.username} 
                                    <div className="text-muted d-inline font-weight-normal"><div className="slash"></div> {profile.position}</div>
                                </div>
                                {profile.description}
                            </div>
                            <div className="card-footer text-center">
                                {
                                /*<div className="font-weight-bold mb-2">Follow Ujang On</div>
                                <a href="#" className="btn btn-social-icon btn-facebook mr-1">
                                    <i className="fab fa-facebook-square"></i> 
                                </a>
                                <a href="#" className="btn btn-social-icon btn-twitter mr-1">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="btn btn-social-icon btn-github mr-1">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="#" className="btn btn-social-icon btn-instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                */}
                            </div>
                        </div>
                        <div className="card profile-widget">
                            <Password />
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-7">
                        <div className="card">
                            <FormProfile />
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(Profile);
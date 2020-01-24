import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormProfile  from '../components/forms/Profile';
import { Password } from '../components/forms/password';
import { get_profile } from '../services/authService';
import { setUserInfo } from '../store/actions'
import { host } from '../utils/index';
// import ImagesUploader from 'react-images-uploader';

const Profile = (props) => {
    const [error, setError] = useState('')
    const [profile, setProfile] = useState([])
    const [imageProfile, setImageProfile] = useState(`${host}/img/user.png`)
    const [image, setImage] = useState('')
    const [showDiv, setShowDiv] = useState(true)
    const { currentInfo } = props

    useEffect(() => {
        async function get_info () {
            let response = await get_profile();
            setProfile(response);
            props.setUserInfo(response);
        }

        get_info();
    }, [])

    const handleChangeImage = () => {        
        setShowDiv(!showDiv)
    }

    const handleImage = (event) => {
        setImage(event.target.files[0])
        let reader = new FileReader();
        reader.onloadend = () => {
            setImageProfile(reader.result)
        }
        reader.readAsDataURL(event.target.files[0])
    }

    const handleUpload = (e) => {
        const token = localStorage.getItem('access_token');
        const formData = new FormData();

        formData.append('file', image);
        formData.append('_csrf', document.head.querySelector("[property~=token][content]").content);

        fetch(`${host}/update-photo`, {
            method: 'put',
            headers: new Headers({
                'Authorization': `Bearer ${token}`, 
            }),
            body: formData
        }).then(res => {
            if(res.ok) {
                alert("File uploaded successfully.")
            }
        });
    }

    return <div className="py-5">
            { error && <div className="text-center"><p>{error}</p></div> }
            <div className="section-body">
                <h2 className="section-title">{currentInfo.username && ''}</h2>
                <p className="section-lead">{currentInfo.description}</p>

                <div className="row mt-sm-4">
                    <div className="col-12 col-md-12 col-lg-5">
                        <div className="card profile-widget">
                            <div className="profile-widget-header">
                                <img 
                                    onClick={handleChangeImage} alt="image" src={imageProfile} 
                                    className="rounded-circle profile-widget-picture" 
                                    style={{ cursor: 'pointer' }}
                                />
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
                            <div className="profile-widget-description" style={{ display: (showDiv) ? 'none' : '' }}>
                                <input type="file" onChange={handleImage} />
                                <a onClick={handleUpload} className="btn btn-warning">Upload</a>
                            </div>
                            <div className="profile-widget-description" style={{ display: (showDiv) ? '' : 'none' }}>
                                <div className="profile-widget-name">{currentInfo.username} 
                                    <div className="text-muted d-inline font-weight-normal"><div className="slash"></div> {currentInfo.position}</div>
                                </div>
                                {currentInfo.description}
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
  currentInfo: state.currentInfo
});

const mapDispatchToProps = {
    setUserInfo: setUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
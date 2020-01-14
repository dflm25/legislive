import React from 'react';
import { connect } from 'react-redux';
import uid from 'uuid/v4';

const UsersConneted = (props) => {

return <div className="col-12 col-sm-6 col-lg-4">
            <div className="card">
                <div className="card-header">
                    <h4>Who's Online?</h4>
                </div>
                <div className="card-body">
                    <ul className="list-unstyled list-unstyled-border">
                        <li className="media">
                            <img alt="image" className="mr-3 rounded-circle" width="50" src="http://covitalidad.edu.umh.es/wp-content/uploads/sites/1352/2018/06/default-user.png" />
                            <div className="media-body">
                                <div className="mt-0 mb-1 font-weight-bold">Hasan Basri</div>
                                <div className="text-success text-small font-600-bold"><i className="fas fa-circle"></i> Online</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
};

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    title: state.title
});

export default connect(mapStateToProps)(UsersConneted);
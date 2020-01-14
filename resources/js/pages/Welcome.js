import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModal, setTitle } from '../store/actions';
import { Link } from "react-router-dom";

class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
    }
    async componentDidMount() {
        
    }
    render () {
        let { loading, data, pending } = this.state;
        let { setModal, setTitle } = this.props

        setTitle('Welcome to virtual fair')

        return <main>
            <Link to={`institution/506`}>VGC international collegue</Link>   
        </main>
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
});

const mapDispatchToProps = {
    setModal : setModal,
    setTitle: setTitle
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

/*
  <div className="row">
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 */
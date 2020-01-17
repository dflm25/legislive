import React, { Component } from 'react';
import { connect } from 'react-redux';
import { left, right } from '../components/chat/ItemChat';
import socket from '../socket';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sub_levels: [],
      loading: false,
      message: '',
      content: []
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ws = new socket();
  }

  componentDidMount ()
  {
    let self = this;
    
    this.ws.chat.on('render_message', (data) => {
      let message_history = self.state.content
      message_history.push(left(data))

      self.setState({ content: message_history })
    })
    
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit (e) { 
    let { message } = this.state;
    let user = JSON.parse(window.localStorage.getItem('user'));
    e.preventDefault()

    this.ws.emit('message', { message, user })
    this.setState({ message: '' })
  }

  render() {
    let { loading, message, content } = this.state;
    let self = this;

    return (
      <div className="row">
          <div className="col-12">
              <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-lg-12">
                        <div className="card chat-box" id="mychatbox">
                            <div className="card-header">
                              <h4>#channel 1</h4>
                            </div>
                            <div className="card-body chat-content" tabIndex="2" style={{ overflow: 'hidden', outline: 'none' }}>
                                {content}
                            </div>
                            <div className="card-footer chat-form">
                                <form id="chat-form" onSubmit={this.handleSubmit}>
                                    <input 
                                      type="text" className="form-control" 
                                      placeholder="Type a message" 
                                      name="message"
                                      value={message}
                                      onChange={this.onChange}
                                    />
                                    <button className="btn btn-primary">
                                        <i className="far fa-paper-plane"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { left, right } from '../components/chat/ItemChat';
import { Link, useParams } from "react-router-dom";
import socket from '../socket';
import { get_room_info } from '../services/roomsService';
import { setCurrentRoom } from '../store/actions'

const objSocket = new socket();

const RoomChat = (props) => {
    const [roomInfo, setRoomInfo] = useState([]);
    const [content, setContent] = useState([]);
    const [message, setMessage] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      async function get_info () {
        let data = await get_room_info(id);
        setRoomInfo(data);
        props.setCurrentRoom(data)
        return false
      }
      get_info();
    }, [id]);

    const handleSubmit = (e) => { 
      let { name, room_id } = props.currentRoom;
      let user = JSON.parse(window.localStorage.getItem('user'));
      e.preventDefault()

      objSocket.ws.getSubscription(`room:${name}-${room_id}`).emit('message', {
        user: user,
        body: message
      })

      setMessage('')
    }

    console.log('objSocket.all', objSocket.all)
    
    objSocket.ws.on('render_message', (data) => {
      console.log('render_message')
      let message_history = self.state.content
      message_history.push(left(data))
      setContent(message_history);
    })

    return <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-4">

                        </div>
                        <div className="col-12 col-sm-12 col-lg-12">
                        <div className="card chat-box" id="mychatbox">
                            <div className="card-header">
                                <h4>#{ roomInfo.name }</h4>
                            </div>
                            <div className="card-body chat-content" tabIndex="2" style={{ overflow: 'hidden', outline: 'none' }}>
                                {content}
                            </div>
                            <div className="card-footer chat-form">
                                <form id="chat-form" onSubmit={handleSubmit}>
                                    <input 
                                        type="text" className="form-control" 
                                        placeholder="Type a message" 
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
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
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    currentRoom: state.currentRoom
});
  
const mapDispatchToProps = {
  setCurrentRoom: setCurrentRoom
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RoomChat);
/*
class RoomChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sub_levels: [],
      loading: false,
      message: '',
      content: [],
      roomInfo: []
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ws = new socket();
  }

  async componentDidMount ()
  {
    let self = this;
    let id = 1
    let info = await get_room_info(id);
    
    this.ws.chat.on('render_message', (data) => {
      let message_history = self.state.content
      message_history.push(left(data))

      self.setState({ content: message_history })
    })

    this.setState({ roomInfo: info })
  }

  handleSubmit (e) { 
    let { message } = this.state;
    let user = JSON.parse(window.localStorage.getItem('user'));
    e.preventDefault()

    this.ws.emit('message', { message, user })
    this.setState({ message: '' })
  }

  render() {
    let { loading, message, content, roomInfo } = this.state;
    let self = this;

    return (
      <div className="row">
          <div className="col-12">
              <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-6 col-lg-4">

                      </div>
                      <div className="col-12 col-sm-12 col-lg-12">
                        <div className="card chat-box" id="mychatbox">
                            <div className="card-header">
                              <h4>#{ roomInfo.name }</h4>
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
*/
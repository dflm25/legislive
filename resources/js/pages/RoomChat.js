import React, { useState, useEffect } from 'react';
import { useImmer } from "use-immer";
import { connect } from 'react-redux';
import { left, right } from '../components/chat/ItemChat';
import { Link, useParams } from "react-router-dom";
import connection from '../socket';
import { get_room_info } from '../services/roomsService';
import { send_message } from '../services/chatService';
import { setCurrentRoom } from '../store/actions'
import { get_user } from '../utils/session';

const RoomChat = (props) => {
    const [roomInfo, setRoomInfo] = useState([]);
    const [content, setContent] = useImmer([]);
    const [message, setMessage] = useState([]);
    const { id } = useParams();
    
    const handleAddMessage = (data) => {
      const { room_id } = props.currentRoom; 

      if (room_id === data.room.id) {
        if (data.user.id == get_user().id) {
          setContent(draft => {  
            draft.push(left(data))
          })
        } else {
          setContent(draft => {  
            draft.push(right(data))
          })
        }
      } else {
        // create notification
        console.log('Create notification', data)
      }
    }

    useEffect(() => {
      setContent(draft => []);
      // props.currentRoom chat.close()
      async function get_info () {
        connection.connect();
        let userInfo = await get_room_info(id);
        setRoomInfo(userInfo);
        props.setCurrentRoom(userInfo);
        
        connection.subscribe(`room:${userInfo.name}-${userInfo.room_id}`, handleAddMessage);     
      }
      get_info();
    }, [id]);

    const handleSubmit = (e) => { 
      e.preventDefault()
      if (message === '')
        return false;
      
      const user = JSON.parse(window.localStorage.getItem('user'));
      const { name, room_id } = props.currentRoom;

      send_message({ user: user, body: message, name: name, room_id: room_id });
      setMessage('');
    }

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
                            <div className="card-body chat-content" tabIndex="2" style={{ overflowY: 'scroll', outline: 'none' }}>
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
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import Ws from '@adonisjs/websocket-client';

let iconUser = "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png";

const Chat = (props) => {
    let { id } = useParams();

    let ws = Ws('ws://localhost:3333', {
        query: "userId=1"
      });
        ws.connect();
    let chat = ws.subscribe(`chat:${id}`)
    console.log('como vamos::::::::::', chat)

    return <div className="row">
            
    </div>
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  title: state.title
});

export default connect(mapStateToProps)(Chat);
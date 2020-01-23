import React from 'react';
import uid from 'uuid/v4';

export const left = (data) => {
    // console.log('left', data)
    return <div key={uid()} className="chat-item chat-left">
            <img src="http://covitalidad.edu.umh.es/wp-content/uploads/sites/1352/2018/06/default-user.png" />
            <div className="chat-details">
                <div className="chat-text">{ data.message }</div>
                <div className="chat-time">{ data.created_at }</div>
            </div>
        </div>
}

export const right = (data) => {
    // console.log('right', data)
    return <div key={uid()} className="chat-item chat-right">
            <img src="http://covitalidad.edu.umh.es/wp-content/uploads/sites/1352/2018/06/default-user.png" />
            <div className="chat-details">
                <div className="chat-text">{ data.message }</div>
                <div className="chat-time">{ data.created_at }</div>
            </div>
        </div>
}


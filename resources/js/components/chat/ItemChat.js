import React from 'react';
import uid from 'uuid/v4';

export const left = (message) => {
    return <div key={uid()} className="chat-item chat-left">
            <img src="http://covitalidad.edu.umh.es/wp-content/uploads/sites/1352/2018/06/default-user.png" />
            <div className="chat-details">
                <div className="chat-text">{ message }</div>
                <div className="chat-time">09:25</div>
            </div>
        </div>
}

export const right = () => {
    return <div key={uid()} className="chat-item chat-right">
            <img src="http://covitalidad.edu.umh.es/wp-content/uploads/sites/1352/2018/06/default-user.png" />
            <div className="chat-details">
                <div className="chat-text">Wat?</div>
                <div className="chat-time">09:25</div>
            </div>
        </div>
}


import { combineReducers } from 'redux';
import Auth from './Auth';
import statusModal from './Modal';
import persistStore from './persistStore';
import { title, currentRoom, currentInfo } from './General';

const RootReducer = combineReducers({ 
    Auth, 
    persistStore, 
    statusModal,
    title,
    currentRoom,
    currentInfo
});

export default RootReducer;

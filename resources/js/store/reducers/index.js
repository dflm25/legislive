import { combineReducers } from 'redux';
import Auth from './Auth';
import statusModal from './Modal';
import persistStore from './persistStore';
import { title, currentRoom } from './General';

const RootReducer = combineReducers({ 
    Auth, 
    persistStore, 
    statusModal,
    title,
    currentRoom
});

export default RootReducer;


import {combineReducers} from 'redux';
import invitations from './invitations';
import groups from './groups';


export default combineReducers({
  invitations,
  groups
});

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import * as actions from './invitations.actions';
import reducer from './invitations.reducer';


import './flow-options';


/*
const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);


store.subscribe((state, prev)=> {
    console.log('listening to store: ', state, prev);
});

store.dispatch(actions.setInvitations({
    items: [{
        id:'123456',
        title:'first'
    }]
}));

store.dispatch(actions.loadMore());

*/

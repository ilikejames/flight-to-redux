import {createStore} from 'Redux';
import * as actions from './invitations.actions';


const initialState = {
    isLoading: false,
    items: [],
    hasLoaded: false
};

const accept = (invitation) => {
    return Object.assign({}, invitation, {
        isAccepted: true,
        isDeclined: false
    })
};

const decline = (invitation) => {
    return Object.assign({}, invitation, {
        isAccepted: false,
        isDeclined: true
    })
}

function invitation(state = initialState, action) {

    switch(action.type) {
        case actions.INVITATIONS_LOADED:
            return Object.assign({}, state, { 
                items: state.items.concat(action.items),
                isLoading: false,
                hasLoaded: true
            });

        case actions.ACCEPT_INVITATION:
            let index = state.items.findIndex(x=>x.id===action.id);
            let list = state.items.slice(0, index)
                .concat(Object.assign({}, accept(state.items[index])))
                .concat(state.items.slice(index+1));
            return Object.assign({}, state, { list: list });

        case actions.LOADING_INVITATIONS:
            return Object.assign({}, state, {
                isLoading:true
            });

        default: 
            return state;
    }
}

export default invitation;

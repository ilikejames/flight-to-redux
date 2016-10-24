import {createStore} from 'Redux';
import * as actions from './invitations.actions';


const initialState = {
    isLoading: false,
    items: [],
    hasLoaded: false
};

const accept = (invitation) => {
    return {
        ...invitation,
        isAccepted: true,
        isDeclined: false
    };
};

const decline = (invitation) => {
    return {
        ...invitation,
        isAccepted: false,
        isDeclined: true
    };
}

function invitation(state = initialState, action) {

    switch(action.type) {
        case actions.INVITATIONS_LOADED:
            return {
                ...state,
                items : state.items.concat(action.items),
                isLoading: false,
                hasLoaded: true
            }

        case actions.ACCEPT_INVITATION:
            let items = state.items.map((x, index) => {
                return index===action.index ? accept(x) : x
            });

            return {
                ...state,
                items
            };
            
        case actions.LOADING_INVITATIONS:
            return {
                ...state,
                isLoading: true
            }

        default: 
            return state;
    }
}

export default invitation;

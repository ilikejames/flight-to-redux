'use strict';

import {createStore} from 'Redux';
import {INVITATION_ACCEPTED, 
        INVITATION_DECLINED, 
        INVITATIONS_LOADED, 
        INVITATIONS_LOADING, 
        INVITATIONS_LOADING_FAILED, 
        INVITATION_FAILED,
        INVITATION_INCREMENT }  from '../actions/invitations';

const initialState = {
    isLoading: false,
    items: [],
    hasLoaded: false
};


function invitations(state = initialState, action) {

    switch(action.type) {
        case INVITATIONS_LOADED:
            action.items = action.items.map(x=>({
                ...x
            }));
            return {
                ...state,
                items: state.items.concat(action.items),
                hasMore: action.hasMore,
                isLoading: false,
                hasLoaded: true
            }

        case INVITATION_ACCEPTED:
            return {
                ...state,
                items: state.items.map((x) => {
                    return x.id===action.id ? accepted(x) : x
                })
            }

        case INVITATION_DECLINED:
            return {
                ...state,
                items: state.items.map((x) => {
                    return x.id===action.id ? declined(x) : x
                })
            }
            
        case INVITATIONS_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case INVITATIONS_LOADING_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case INVITATION_FAILED:
            return {
                ...state,
                items: state.items.map((x) => {
                    return x.id===action.id ? failed(x) : x
                }),
                isLoading:false
            }

        case INVITATION_INCREMENT: 
            return {
                ...state,
                items: state.items.map((x) => {
                    return x.id===action.id ? increment(x) : x
                })
            }

        default: 
            return state;
    }
}

const accepted = invitation => {
    return {
        ...invitation,
        isAccepted: true,
        isDeclined: false,
        hasFailed: false
    };
};

const declined = invitation => {
    return {
        ...invitation,
        isAccepted: false,
        isDeclined: true,
        hasFailed: false
    };
}

const failed = invitation => {
    return {
        ...invitation,
        hasFailed: true
    }
}

const increment = invitation => {
    return {
        ...invitation,
        counter: (invitation.counter+1) || 1
    }
}

export default invitations;

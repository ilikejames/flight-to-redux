'use strict';

import {createStore} from 'Redux';
import {INVITATION_ACCEPTED, 
        INVITATION_DECLINED, 
        INVITATIONS_LOADED, 
        INVITATIONS_LOADING, 
        INVITATIONS_LOADING_FAILED, 
        INVITATION_FAILED}  from '../actions/invitations';

const initialState = {
    isLoading: false,
    items: [],
    hasLoaded: false
};


function invitations(state = initialState, action) {

    switch(action.type) {
        case INVITATIONS_LOADED:
            return {
                ...state,
                items : state.items.concat(action.items),
                hasMore : action.hasMore,
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

export default invitations;

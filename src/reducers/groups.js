'use strict';

import {createStore} from 'Redux';
import {
        GROUPS_LOADING,
        GROUPS_LOADING_FAILED,
        GROUPS_LOADED,
        GROUPS_INCREMENT
        }  from '../actions/groups';

const initialState = {
    isLoading: false,
    items: [],
    hasLoaded: false
};


function groups(state = initialState, action) {

    switch(action.type) {
        case GROUPS_LOADED:
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
            
        case GROUPS_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case GROUPS_LOADING_FAILED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case GROUPS_INCREMENT: 
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


const increment = group => {
    return {
        ...group,
        counter: (group.counter+1) || 1
    }
}

export default groups;

'use strict';

import * as groupSvc from './services/groupSvc';

export const GROUPS_LOADING = 'GROUPS_LOADING';
export const GROUPS_LOADING_FAILED = 'GROUPS_LOADING_FAILED';
export const GROUPS_LOADED = 'GROUPS_LOADED';
export const GROUPS_INCREMENT = 'GROUPS_INCREMENT';


const LIMIT = 5;

const loaded = (groups) => ({
        type: GROUPS_LOADED,
        items: groups.items
    });

const failedToLoad = err => ({
        type: GROUPS_LOADING_FAILED,
        message: err
    });

export const incrementGroup = id => {
    return function(dispatch) {
        dispatch({
            type: GROUPS_INCREMENT,
            id
        });
    }
}

export const load = () => {
    return function(dispatch) {
        dispatch({
            type: GROUPS_LOADING
        });

        groupSvc.load(LIMIT)
            .then(results => {
                return dispatch(loaded(results));
            })
            .catch(err => {
                return dispatch(failedToLoad(err));
            })
    }
}
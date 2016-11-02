'use strict';

import * as invitationSvc from './services/invitationSvc';

export const INVITATIONS_LOADING = 'INVITATIONS_LOADING';
export const INVITATIONS_LOADING_FAILED = 'INVITATIONS_LOADING_FAILED';
export const INVITATIONS_LOADED = 'INVITATIONS_LOADED';
export const INVITATION_FAILED = 'INVITATION_FAILED';
export const INVITATION_ACCEPTED = 'INVITATION_ACCEPTED';
export const INVITATION_DECLINED = 'INVITATION_DECLINED';
export const INVITATION_INCREMENT = 'INVITATION_INCREMENT';

const LIMIT=4;

function loaded(invitations) {
    return {
        type: INVITATIONS_LOADED,
        items: invitations.items
    }
};

function accepted(id) {
    return {
        type: INVITATION_ACCEPTED,
        id
    }
}

function declined(id) {
    return {
        type: INVITATION_DECLINED,
        id
    };
}

function failedItem(id) {
    return {
        type: INVITATION_FAILED,
        id
    };
}

function loaded(items) {
    return {
        type: INVITATIONS_LOADED,
        items: items.items,
        hasMore: items.items.length == LIMIT
    }
}
function failedToLoad(err) {
    return {
        type: INVITATIONS_LOADING_FAILED,
        message: err
    }
}

export function increment(id) {
    return function(dispatch) {
        dispatch({
            type: INVITATION_INCREMENT,
            id
        });
    }
}
export function load() {
    return function(dispatch) {
        dispatch({
            type: INVITATIONS_LOADING
        });

        invitationSvc.load(LIMIT)
            .then(results => {
                return dispatch(loaded(results));
            })
            .catch(err => {
                return dispatch(failedToLoad(err));
            })
    }
}

export function accept(id) {
    return function(dispatch) {
        invitationSvc.accept(id)
        .then(results => {
            return dispatch(accepted(id))
        })
        .catch(err=>{
            return dispatch(failedItem(id));
        });
    }
}

export function decline(id) {
    return function(dispatch) {
        invitationSvc.accept(id)
        .then(results => {
            return dispatch(declined(id))
        })
        .catch(err=>{
            return dispatch(failedItem(id));
        });
    }
}

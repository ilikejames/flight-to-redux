
const LOAD_COMMUNITIES='LOAD_COMMUNITIES';
const LOAD_COMMUNITIES_COMPLETE='LOAD_COMMUNITIES_COMPLETE';
const LOAD_COMMUNITIES_NEXT_PAGE='LOAD_COMMUNITIES_NEXT_PAGE';
const OPEN_CREATE_GROUP_MODAL='OPEN_CREATE_GROUP_MODAL';
const CLOSE_CREATE_GROUP_MODAL='CLOSE_CREATE_GROUP_MODAL';
const CREATE_GROUP='CREATE_GROUP';

// const dispatch = require('dispatcher');

const initialState = {
    items: [], 
    count: 0, 
    isLoaded: false, 
    isLoading: false
};

function getCommunities(state = initialState, action) {

    if(state.isLoading) {
        return state;
    }

    // if(!state.isLoaded && state.count==0) {
    //     return state;
    // }

    if(state.next) {
        stage.next()
        .then(page=>{
            state.items = state.items.concat(page.items);
            const newstate = object.assign({}, state, { next : page.next, headers: page.headers });
            dispatch(LOAD_COMMUNITIES_COMPLETE, newstate);
        });
        return Object.assign({}, state, { isLoading: true });
    }

    api.communities.list({ sort: 'name'})
    .then(page => {
        state.items = state.items.concat(page.items);
        const newstate = object.assign({}, state, { next : page.next, headers: page.headers });
        dispatch(LOAD_COMMUNITIES_COMPLETE, newstate);
    })

    return Object.assign({}, state, { isLoading: true })

}
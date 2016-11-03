'use strict';

// this is the "container" in react style, or "controller" in mvc.

import watch from 'redux-watch';
import { load as loadInvitations, accept, decline, increment } from '../actions/invitations';
import someSpecificList from '../components/SomeSpecificList';
import store from '../store';



// Here, we wire up dumb flight components views. 
// The sub views are dumb. Flight components just (maybe) render, and attach dom event handlers such as click handlers
// The handlers call redux actions
someSpecificList.attachTo('#page-list', {
  aNormalProperty: 'isfine',
  acceptHandler: () => data => store.dispatch(accept(data.id)),
  declineHandler: () => data => store.dispatch(decline(data.id)),
  loadPageHandler: () =>() => store.dispatch(loadInvitations()),
  incrementHandler: () => data => store.dispatch(increment(data.id))
});

// another list!
someSpecificList.attachTo('#page-list-2', {
  acceptHandler: null,
  declineHandler: null,
  loadPageHandler: null,
  incrementHandler: null
});

// Use watch to bridge state subchanges (state.invitations, state.invitations.propertyChanged) to flightjs events
// There is only a single state tree, but here we can listen to just parts of the tree
// Even a single item on the state tree e.g. 'invitations.items.0.isLoading'
store.subscribe(watch(store.getState, 'invitations')((newstate, prevstate, path) => {
  $('#page-list').trigger('update', newstate);
}));


// dispatch action to load initial invitations
store.dispatch(loadInvitations());

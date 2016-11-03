'use strict';

// this is the "container" in react style, or "controller" in mvc.

import watch from 'redux-watch';
import { load as loadInvitations, accept, decline, increment } from '../actions/invitations';
import { load as loadGroups, incrementGroup } from '../actions/groups';
import invitationList from '../components/invitationList';
import groupList from '../components/groupList';

import store from '../store';



// Here, we wire up dumb flight components views. 
// The sub views are dumb. Flight components just (maybe) render, and attach dom event handlers such as click handlers
// The handlers call redux actions
invitationList.attachTo('#invitation-list', {
  aNormalProperty: 'isfine',
  acceptHandler: () => data => store.dispatch(accept(data.id)),
  declineHandler: () => data => store.dispatch(decline(data.id)),
  loadPageHandler: () =>() => store.dispatch(loadInvitations()),
  incrementHandler: () => data => store.dispatch(increment(data.id))
});

// Use watch to bridge state subchanges (state.invitations, state.invitations.propertyChanged) to flightjs events
// There is only a single state tree, but here we can listen to just parts of the tree
// Even a single item on the state tree e.g. 'invitations.items.0.isLoading'
store.subscribe(watch(store.getState, 'invitations')((newstate, prevstate, path) => {
  $('#invitation-list').trigger('update', newstate);
}));

// another list!
groupList.attachTo('#group-list', {
  loadPageHandler: () => data => store.dispatch(loadGroups()),
  incrementHandler: () => data => store.dispatch(incrementGroup(data.id))
});
// and subcribe
store.subscribe(watch(store.getState, 'groups')((newstate, prevstate, path) => {
  $('#group-list').trigger('update', newstate);
}));

// dispatch action to load initial invitations
store.dispatch(loadInvitations());
store.dispatch(loadGroups());


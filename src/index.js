
import { load as loadInvitations, accept, decline } from './actions/invitations';
import listComponent from './components/list';
import watch from 'redux-watch';
import store from './store';


listComponent.attachTo('#page-list', {
  acceptHandler: () => (id) => store.dispatch(accept(id)),
  declineHandler: () => (id) => store.dispatch(decline(id)),
  loadPageHandler: () =>() => store.dispatch(loadInvitations()),
  list: []
});


listComponent.attachTo('#page-list-2', {
  acceptHandler: null,
  declineHandler: null,
  loadPageHandler: null,
  list: []
});


store.subscribe(watch(store.getState, 'invitations')((newstate, prevstate, path) => {
  $('#page-list').trigger('update', newstate);
}));



store.dispatch(loadInvitations());

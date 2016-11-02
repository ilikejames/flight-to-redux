
import { load as loadInvitations, accept, decline, increment } from './actions/invitations';
import listComponent from './components/list';
import watch from 'redux-watch';
import store from './store';


listComponent.attachTo('#page-list', {
  acceptHandler: () => (data) => store.dispatch(accept(data.id)),
  declineHandler: () => (data) => store.dispatch(decline(data.id)),
  loadPageHandler: () =>() => store.dispatch(loadInvitations()),
  incrementHandler: () => (data) => store.dispatch(increment(data.id))
});


listComponent.attachTo('#page-list-2', {
  acceptHandler: null,
  declineHandler: null,
  loadPageHandler: null,
  incrementHandler: null
});


store.subscribe(watch(store.getState, 'invitations')((newstate, prevstate, path) => {
  $('#page-list').trigger('update', newstate);
}));



store.dispatch(loadInvitations());


import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import * as actions from './actions/invitations';
import reducers from './reducers';
import listComponent from './components/list';
import watch from 'redux-watch';
import { composeWithDevTools } from 'redux-devtools-extension';



const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
);

listComponent.attachTo('#page-list', {
  acceptHandler: () => (id) => store.dispatch(actions.accept(id)),
  declineHandler: () => (id) => store.dispatch(actions.decline(id)),
  loadPageHandler: () =>() => store.dispatch(actions.load()),
  list: []
});


listComponent.attachTo('#page-list-2', {
  acceptHandler: null,
  declineHandler: null,
  loadPageHandler: null,
  list: []
});


store.subscribe(watch(store.getState, 'invitations')((newstate, prevstate, path) => {
  console.log('changed!', newstate);
  $('#page-list').trigger('update', newstate);
}));



store.dispatch(actions.load());

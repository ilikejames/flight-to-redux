const flight = require('flightjs')
const withState = require('flight-with-state')
const $ = require('jquery');


const component = flight.component(withState, function() {

    this.attributes({
        acceptHandler: null,
        loadPageHandler: null
    });

    this.after('initialize', function(node, params) {
        console.log('params', params);
        this.replaceState(params.data);

        this.on('button', 'click', function(ev) {
            console.log('called for ', this.state);
            //this.attr.acceptHandler(this.state.id).then(this.updateState.bind(this));
        });
    });

    this.stateChanged = (state, prev) => {
        console.log('stateChanged()', state, prev);
    };

    this.updateState = function(newState) {
        console.log('updateState', newState, this.state); 
        this.mergeState(newState);
        console.log('after', this.state);

        this.$node.find('button').text('click: ' + this.state.isAccepted);
    };

});

const invitationSvc = {
    accept: (id) => {
        console.log('invitationSvc', 'accept', id);
        return Promise.resolve({ isAccepted : true });
    }
}

const groupSvc = {
    getNextPage: () => {
        return Promise.resolve({
            items: [],
            hasNexPage:true
        });
    }
}


const page_implicit = () => {

    component.attachTo('#page-list', {
        acceptHandler: (id) => {
            return invitationSvc.accept.bind({}, id);
        },
        loadPageHandler: ()=> {
            return groupSvc.getNextPage;
        }
    }, { data: { id: 23, title: 'title' }});

    component.attachTo('#page-list-again', {
        acceptHandler: (id) => {
            return invitationSvc.accept.bind({}, id);
        },
        loadPageHandler: ()=> {
            return groupSvc.getNextPage;
        }
    }, { data: { id: 24, title: 'title2' }});

}

page_implicit();


///////////////
/*
const store = {};
const actions = {
    'ACCEPT_INVITATION': () => ({}),
    'FETCH_GROUPS': () => ({})
};

const page_actions = () => {

    const pageListComponent = component.attachTo('#page-list', {
        acceptHandler: id => {
            actions.ACCEPT_INVITATION(id);
        }
    });

    store.subscribe(()=>{
        const newState = store.getState();

    });
}
*/


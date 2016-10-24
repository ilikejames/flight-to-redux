const flight = require('flightjs')
const withState = require('flight-with-state')
const $ = require('jquery');


const listComponent = flight.component(function() {

    this.attributes({
        acceptHandler: null,
        loadPageHandler: null
        items: []
    });

    this.after('initialize', function(el, params) {
        this.on('addItems', function(items) {

        })
    });

    this.addItems = (items) => {
        const $list = this.$node.find('.list');
        items.forEach(x => {
            const $html = $.tmpl(template, x);
            //const existing = $list.find(`[data-id=${x.id}]`);
            if(existing.length) {
                const replacedComponent = component.
                existing.replace($html);
            }
            else {
                $list.append($wrapped);
            }
        })
    };
});

const component = flight.component(function() {
    
    this.attributes({
        acceptHandler: null,
        declineHanlder: null,
        loadPageHandler: null,
        data: null
    });

    this.after('initialize', function(el, params) {
        $(el).click('.accept', ()=> this.attr.acceptHandler(this.attr.data.id));
        $(el).click('.decline', ()=> this.attr.declineHanlder(this.attr.data.id));
    });

});

// const component = flight.component(withState, function() {

//     this.attributes({
//         acceptHandler: null,
//         loadPageHandler: null
//     });

//     this.after('initialize', function(attachedTo, params) {
        
//         console.log('params', params);
//         this.replaceState(params.data);

//         this.$node.find('button').click(()=>{
//             console.log('clicked button for #%d', this.state.id);
//             this.attr.acceptHandler(this.state.id)
//                 .then(this.updateState.bind(this));
//         });
//     });

//     this.stateChanged = (state, prev) => {
//         console.log('stateChanged()', state, prev);
//     };

//     this.updateState = function(newState) {
//         console.log('updateState', newState, this.state); 
//         this.mergeState(newState);
//         console.log('after', this.state);

//         this.$node.find('button').text('click: ' + this.state.isAccepted);
//     };

// });


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

    component.attachTo('#page-list-1', {
        acceptHandler: () => {
            return invitationSvc.accept
        },
        loadPageHandler: ()=> {
            return groupSvc.getNextPage;
        }
    }, { data: { id: 23, title: 'title' }});

    component.attachTo('#page-list-2', {
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


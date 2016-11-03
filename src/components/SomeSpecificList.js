'use strict';

import flight from 'flightjs';
import listItem from '../components/SomeSpecificListItem';
import withListItemUpdates from './withListItemUpdates';


const SomeSpecificList = function() {

    this.attributes({
        acceptHandler: null,
        declineHandler: null,
        incrementHandler: null,
        loadPageHandler: null
    });

    this.after('initialize', function(el, params) {
        this.$node.find('.more').click(this.attr.loadPageHandler);
        
        // handler for updates on this compoent, triggered from the page
        this.on('update', this.onUpdateItems.bind(this));
    });

    this.onUpdateItems = function (e, data) {
        // don't keep bubbling events upwards...
        e.stopPropagation();

        const $this = $(e.target);

        // calls mixin that handles updates in lists.
        this.listMixinUpdate($this.find('.list'), data.items, listItem, {
            'acceptHandler': this.attr.acceptHandler,
            'declineHandler': this.attr.declineHandler,
            'incrementHandler': this.attr.incrementHandler
        });

        // update view more
        $this.find('.more').toggleClass('spin', data.isLoading);
    };
};

module.exports = flight.component(SomeSpecificList, withListItemUpdates);

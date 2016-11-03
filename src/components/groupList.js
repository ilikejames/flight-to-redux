'use strict';

import flight from 'flightjs';
import listItem from './groupListItem';
import withListItemUpdates from './withListItemUpdates';


const GroupList = function() {

    this.attributes({
        loadPageHandler: null,
        incrementHandler: null
    });

    this.after('initialize', function(el, params) {
        this.$node.find('.more').click(this.attr.loadPageHandler);
        
        // handler for updates on this compoent, triggered from the page
        this.$node.on('update', this.onUpdateItems.bind(this));
    });

    this.onUpdateItems = function (e, data) {
        // don't keep bubbling events upwards...
        e.stopPropagation();

        const $this = $(e.target);

        // calls mixin that handles updates in lists.
        this.listMixinUpdate($this.find('.list'), data.items, listItem, {
            incrementHandler: this.attr.incrementHandler
        });

        // update view more
        $this.find('.more').toggleClass('spin', data.isLoading);
    };
};

module.exports = flight.component(GroupList, new withListItemUpdates());

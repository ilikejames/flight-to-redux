'use strict';

const flight = require('flightjs');
const Item = require('./Item');
const withListItemUpdates = require('./withListItemUpdates');


const List = function() {

    this.attributes({
        acceptHandler: null,
        declineHandler: null,
        incrementHandler: null,
        loadPageHandler: null,
    });

    this.after('initialize', function(el, params) {
        this.on('update', this.onUpdateItems.bind(this));
        this.$node.find('.load-more').click(this.attr.loadPageHandler);
        this.$node.find('.more').click(this.attr.loadPageHandler);
    });

    this.onUpdateItems = function (e, data) {

        // don't keep bubbling events upwards...
        e.stopPropagation();

        const $this = $(e.target);

        this.listMixinUpdate($this.find('.list'), data.items, Item, {
            'acceptHandler': this.attr.acceptHandler,
            'declineHandler': this.attr.declineHandler,
            'incrementHandler': this.attr.incrementHandler
        });

        $this.find('.more').toggleClass('spin', data.isLoading);
    };
};

module.exports = flight.component(List, withListItemUpdates);

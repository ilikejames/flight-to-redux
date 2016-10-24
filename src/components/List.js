'use strict';

const flight = require('flightjs');
const Item = require('./Item');


let List = function() {

    this.attributes({
        acceptHandler: null,
        declineHandler: null,
        loadPageHandler: null,
        items: []
    });

    this.after('initialize', function(el, params) {
        this.on('update', this.updateItems.bind(this));
        this.$node.find('.load-more').click(this.attr.loadPageHandler);
        this.$node.find('.more').click(this.attr.loadPageHandler);
    });

    this.updateItems = function (e, data) {
        const $list = $(e.target).find('.list');

        // update items
        data.items.forEach(x => {
            const existing = $list.find(`[data-id=${x.id}]`);
            if(existing.length) {
                // update
                Item.attachAndReplace(existing, {
                    data: x,
                    acceptHandler: () => ()=> this.attr.acceptHandler(x.id),
                    declineHandler: () => () => this.attr.declineHandler(x.id),
                });
            }
            else {
                // append
                const $wrapper = $('<div/>').attr('data-id', x.id);
                $list.append($wrapper);
                Item.attachTo($wrapper, {
                    data: x,
                    acceptHandler: () => () => this.attr.acceptHandler(x.id),
                    declineHandler: () => () => this.attr.declineHandler(x.id),
                });
                this.attr.list = this.attr.list || [];
                this.attr.list.push(x);
            }
        });
        // TODO: update load more button
        console.log(data.hasMore && !data.isLoading);
        $(e.target).find('.more').toggleClass('spin', data.isLoading);
    };
};

module.exports = flight.component(List);

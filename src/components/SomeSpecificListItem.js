'use strict';

import flight from 'flightjs'

const Item = flight.component(function Item() {

    // Handlers are passed down through flight attributes
    this.attributes({
        acceptHandler: null,
        declineHandler: null,
        incrementHandler:null,
        data: null
    });

    this.after('initialize', function() {

        // register update handler
        // TODO: only once....
        this.$node.on('update', this.onUpdate.bind(this));

        let html = template(this.attr.data);

        // render
        this.$node.html(html);

        // dom events, wire up to the passed handlers
        this.$node.find('.accept').click(this.attr.acceptHandler);
        this.$node.find('.decline').click(this.attr.declineHandler);
        this.$node.find('.counter').click(this.attr.incrementHandler);
    });

    this.onUpdate = function(e, data) {
        // stop events bubling upwards
        e.stopPropagation();

        // reinit, render, wire-up handlers
        this.initialize(this.$node, data);
    }
});


// or mustache, whatever renderer
const template = (data) => {
    return `
        <h2>${data.id}.${data.name}</h2>
        <span class="status">${data.isAccepted ? 'Accepted' : '' }${data.isDeclined ? 'Declined' : '' }</span>
        <span style="${data.isAccepted || data.isDeclined ? 'display:none' : ''}">
            <button class="accept">Accept</button>
            <button class="decline">Decline</button>
            <button class="counter">Clicked: ${data.counter}</button>
        </span>
        <hr>
    `;
};

module.exports = Item;


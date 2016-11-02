'use strict';

const flight = require('flightjs');

const Item = flight.component(function Item() {

    // Handlers are passed down through flight attributes
    this.attributes({
        acceptHandler: null,
        declineHandler: null,
        data: null
    });

    this.after('initialize', function() {
        let html = template(this.attr.data);
        this.$node.html(html);

        // dom events, call the passed handlers
        this.$node.find('.accept').click(this.attr.acceptHandler);
        this.$node.find('.decline').click(this.attr.declineHandler);
    });
});

// TODO: move to flight event. 
const attachAndReplace = (el, attr) => {
    let $item = $(template(attr.data));
    el.html($item);
    Item.attachTo($item, attr);
};

Item.attachAndReplace = attachAndReplace;


const template = (data) => {
    return `<div>
        <h2>${data.id}.${data.name}</h2>
        <span class="status">${data.isAccepted ? 'Accepted' : '' }${data.isDeclined ? 'Declined' : '' }</span>
        <span style="${data.isAccepted || data.isDeclined ? 'display:none' : ''}">
            <button class="accept">Accept</button>
            <button class="decline">Decline</button>
        </span>
        <hr>`;
};

module.exports = Item;


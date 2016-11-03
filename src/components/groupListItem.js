'use strict';

import flight from 'flightjs'
import withItemUpdates from './withItemUpdates'


module.exports = flight.component(Item, withItemUpdates);

function Item() {

    // Handlers are passed down through flight attributes
    this.attributes({
        data: null,
        incrementHandler: null
    });

    this.after('initialize', function() {
        let html = template(this.attr.data);
        // render
        this.$node.html(html);

        this.$node.find('.increment').click(this.attr.incrementHandler);
    });

}


// or mustache, whatever renderer
const template = (data) => {
    return `
        <h2>${data.id}.${data.name}</h2>
        <button class="increment">Counter: ${data.counter}</button>
        <hr>
    `;
};



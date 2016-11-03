'use strict';

import flight from 'flightjs'

function withListItemUpdates() {

    const cache = {};

    this.listMixinUpdate = function($container, items, Item, props={}) {

        items.forEach(x => {

            // TODO: remove items
            
            // check for changes on already rendered objects
            // because existing rendered objects not been mutated we can do comparison between objects directly.
            if(cache[x.id] && cache[x.id]._hash && cache[x.id]==x) {
                // console.log('existing item: nochange');
                return;
            }

            const existing = $container.find(`[data-id=${x.id}]`);
            const wrappedProps = {};

            // flightjs, calls attributes if they are functions... so we have to re-wrap them downwards
            for(let prop in props) {
                if(typeof props[prop] === 'function') {
                    wrappedProps[prop] = () => props[prop].bind({}, x);
                }
                else {
                    wrappedProps[prop] = props[prop];
                }
            }

            if(existing.length) {
                // update
                // flight event on existing dom element
                existing.trigger('update', {
                    data: x,
                    ...wrappedProps
                });
            }
            else {
                // append new item
                // uuid are our friend here. Should rethink for truely general solution.
                const $wrapper = $('<div/>').attr('data-id', x.id);
                $container.append($wrapper);
                Item && Item.attachTo && Item.attachTo($wrapper, {
                    data: x,
                    ...wrappedProps
                });
            }
            // cache it...though that means remove is a problem.
            cache[x.id]=x;
        });

    }
    
}

module.exports = () => {
    return withListItemUpdates;
};
'use strict';

import flight from 'flightjs'

const cached = {};

function withListItemUpdates() {

    this.listMixinUpdate = function($container, items, Item, props={}) {

        items.forEach(x => {

            // TODO: remove items

            // check for cached items... and whether they are equal via hash
            if(cached[x.id] && cached[x.id]._hash && cached[x.id]._hash==x._hash) {
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
            cached[x.id]=x;
        });

    }
}

module.exports = withListItemUpdates;
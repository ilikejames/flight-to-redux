const flight = require('flightjs');

const cached = {};

function withListItemUpdates() {

    this.listMixinUpdate = function($container, items, Item, props={}) {

        items.forEach(x => {

            // TODO: remove items

            // check for cached items... and whether they are equal via hash
            // TODO: handle removed DOM items.
            if(cached[x.id] && cached[x.id]._hash && cached[x.id]._hash==x._hash) {
                // console.log('existing item: nochange');
                return;
            }

            const existing = $container.find(`[data-id=${x.id}]`);
            const wrappedProps = {};

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
                // TODO: update via flight event...?
                // Item.attachAndReplace(existing, {
                //     data: x,
                //     ...wrappedProps
                // });
                existing.trigger('update', {
                    data: x,
                    ...wrappedProps
                });
            }
            else {
                // append
                const $wrapper = $('<div/>').attr('data-id', x.id);
                $container.append($wrapper);
                Item && Item.attachTo && Item.attachTo($wrapper, {
                    data: x,
                    ...wrappedProps
                });
            }
            cached[x.id]=x;
        });

    }
}

module.exports = withListItemUpdates;
const flight = require('flightjs');


function withListItemUpdates() {

    this.listMixinUpdate = function($container, items, Item, props={}) {
        items.forEach(x => {

            // TODO: cache dom items and comparison on object... or keep letting browser decide whether to update of not.

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
                
                Item.attachAndReplace(existing, {
                    data: x,
                    ...wrappedProps
                });
            }
            else {
                // append
                const $wrapper = $('<div/>').attr('data-id', x.id);
                $container.append($wrapper);
                Item.attachTo($wrapper, {
                    data: x,
                    ...wrappedProps
                });
            }
        });

    }
}

module.exports = withListItemUpdates;
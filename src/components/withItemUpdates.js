
'use strict';

import flight from 'flightjs'


function withItemUpdates() {

    this.after('initialize', function() {
        // wire up once.
        if(this.withItemUpdatesBoundHandler) return;

        this.withItemUpdatesBoundHandler = this.withItemUpdatesHandler.bind(this);
        this.$node.on('update', this.withItemUpdatesBoundHandler);
    });

    this.withItemUpdatesHandler = function(e, data) {
        // stop events bubling upwards
        e.stopPropagation();
        // reinit, render, wire-up handlers
        this.initialize(this.$node, data);
        this.afterRender && this.afterRender();
    }

}

module.exports = withItemUpdates;


'use strict';

var flight = require('flightjs');
var withViewMoreButton = require('mixins/view-more-button');
var memberSummaryTemplate = require('partials/member-summary.mustache');

module.exports = flight.component(communityMembers, withViewMoreButton);

function communityMembers() {
    this.attributes({
        eventNamespace: null
    });

    this.after('initialize', function() {
        this.addMembers = addMembers.bind(this);
        this.addMember = addMember.bind(this);

        this.on(document, 'ui:' + this.attr.eventNamespace + ':append', this.addMembers);

        this.on(document, 'ui:' + this.attr.eventNamespace + ':loadingfailed', function() {
            this.$node.find('.async-error-message').show();
        });

        this.trigger('api:' + this.attr.eventNamespace + ':viewinitial');
    });
}

function addMembers(_ev, data) {
    data.communities.forEach(this.addMember);
}

function addMember(member) {
    $(memberSummaryTemplate.render(member)).appendTo(this.$node.find('.members-list'));
}


///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// communityList.js

const template = require('templates/community-item');

module.exports = flight.component(communityMembersList, withViewMoreButton);

function communityMembersList() {

    this.attributes({
        page: null,
        error: error
    });

    this.after('initialize', () => {
        this.render(this.attr.page);
    });

    this.render = page => {
        // renders the list in the page
        this.toggleViewMore(page.hasOwnProperty('next'));
    };

    this.showError = err => {
        // show error message
        console.log('error');
    };
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// view-more.button.js

module.exports = function(isMore) {

    this.toggleViewMore = (isVisible) => {
        
    }
}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// indexPage.js

const service = require('services/communities');
const ui = require('ui/communityMembersList');
2
service.getMembers(12)
.then(page => {
    ui.attachTo('#item', {page : page});
});





//////////////////////////////////////////
/*
dumb ui components
 - notify parent of events
 
 smart components
 - calls services
 - renders dumb components
 - handles events



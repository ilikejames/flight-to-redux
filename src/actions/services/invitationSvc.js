const api = require('./api');

let next;

export const load = () => {
        const f = next || api.invitations.list.bind({}, 6);

        return f()
        .then(results => {
            next = results.next;
            return results;
        });
    };

export const accept = (id) => api.invitations.accept(id);

export const decline=  (id) => api.invitations.decline(id);


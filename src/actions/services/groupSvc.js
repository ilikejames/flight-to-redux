const api = require('./api');

let next;

export const load = () => {
        const f = next || api.groups.list.bind({}, { limit: 5 });

        return f()
        .then(results => {
            next = results.next;
            return results;
        });
    };


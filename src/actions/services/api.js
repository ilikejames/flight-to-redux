
let invitationCounter = 0;
let groupCounter = 0;

module.exports = {
    groups: {
        list: (limit) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    const data = {
                        count : limit,
                        items : []
                    };
                    for(let i=0;i<limit;i++) {
                        data.items.push(getItemGroups());
                    };
                    resolve(data);
                },100);
            });
        }
    },

    invitations : {
        list : (limit) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    const data = {
                        count : limit,
                        items : []
                    };
                    for(let i=0;i<limit;i++) {
                        data.items.push(getItem());
                    };
                    resolve(data);
                    
                }, 1500);
            })
        },
        accept: id => Promise.resolve(id), 
        decline: id => Promise.resolve(id)
    }
};


const getItemGroups = () => ({id: ++groupCounter, name: 'x'.repeat(((42304324203 % groupCounter)*3)+1) });
const getItem = () => ({id: ++invitationCounter, name: 'x'.repeat(((42304324203 % invitationCounter)*3)+1) });

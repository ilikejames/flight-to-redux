
let invitationCounter = 0;
let groupCounter = 0;

module.exports = {
    groups: {
        list: (limit) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve({
                        count : 19,
                        items: [
                            getItemGroups(),
                            getItemGroups(),
                            getItemGroups(),
                            getItemGroups()                         
                        ]
                    })
                },100);
            });
        }
    },

    invitations : {
        list : (limit) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve({
                        count : 19,
                        items: [
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem(),
                            getItem()
                        ]
                    })
                }, 1500);
            })
        },
        accept: id => Promise.resolve(id), 
        decline: id => Promise.resolve(id)
    }
};


const getItemGroups = () => ({id: ++groupCounter + 'x', name: 'x'.repeat(((42304324203 % groupCounter)*3)+1) });
const getItem = () => ({id: ++invitationCounter, name: 'x'.repeat(((42304324203 % invitationCounter)*3)+1) });

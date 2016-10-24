
let counter = 0;

module.exports = {
    invitations : {
        list : (limit) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve({
                        count : 4,
                        items: [
                            {id: ++counter, name: counter},
                            {id: ++counter, name: counter},
                            {id: ++counter, name: counter},
                            {id: ++counter, name: counter}
                        ]
                    })
                }, 1500);
            })
        },
        accept: id => Promise.resolve(id), 
        decline: id => Promise.resolve(id)
    }
};

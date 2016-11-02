
let counter = 0;

module.exports = {
    invitations : {
        list : (limit) => {
            return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve({
                        count : 4,
                        items: [
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


const getItem = () => ({id: ++counter, name: 'x'.repeat(((42304324203 % counter)*3)+1) });

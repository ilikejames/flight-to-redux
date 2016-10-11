import fetch from 'isomorphic-fetch';

export const LOAD_INVITATIONS = 'LOAD_INVITATIONS';
export const INVITATIONS_LOADED = 'INVITATIONS_LOADED';
export const ACCEPT_INVITATION = 'ACCEPT_INVITATION';
export const DECLINE_INVITATION = 'DECLINE_INVITATION';
export const LOADING_INVITATIONS = 'LOADING_INVITATIONS';
export const LOAD_INVITATIONS_NEXT_PAGE = 'LOAD_INVITATIONS_NEXT_PAGE';


function loaded(invitations) {
    return {
        type: INVITATIONS_LOADED,
        items: invitations.items
    }
};

export function setInvitations(invitations) {
    return function(dispatch) {
        dispatch(loaded(invitations));
    }
}

export function loadMore() {
    return function(dispatch) {
        dispatch({
            type: LOADING_INVITATIONS
        });

        // aysnc pretend
        setTimeout(()=> {
            const data = [...new Array(10)].map(x=>make());
            dispatch(loaded({items: data }));
        },1000)
    }
}


// 
const words = 'Lacquerware is a longstanding tradition in Japan,[5][6] at some point it may have been combined with maki-e as a replacement for other ceramic repair techniques. One theory is that kintsugi may have originated when Japanese shogun Ashikaga Yoshimasa sent a damaged Chinese tea bowl back to China for repairs in the late 15th century.[7] When it was returned, repaired with ugly metal staples, it may have prompted Japanese craftsmen to look for a more aesthetic means of repair. Collectors became so enamored with the new art that some were accused of deliberately smashing valuable pottery so it could be repaired with the gold seams of kintsugi.[2] Kintsugi became closely associated with ceramic vessels used for chanoyu (Japanese tea ceremony).[3] While the process is associated with Japanese craftsmen, the technique was applied to ceramic pieces of other origins including China, Vietnam, and Korea.'.split(' ');

function getWord() {
    return words[Math.floor(Math.random()*words.length)];
}

function getWords(i) {
    return [...new Array(i)].map(getWord).join(' ');
}
function make() {
    return {
        id: Math.floor(Math.random()*1000),
        title: getWords(Math.floor(Math.random()*20))
    }
}
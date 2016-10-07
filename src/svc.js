
function handleError(err) {
    console.log('error');
    throw err;
}

function getCommunities() {
    return api.community.list({ limit: 10 })
        catch(err => handleError);
}

function getMembers(id, limit=10) {
    return api.community.members.list(id, {limit});
}

const communities = {
    getAll: getCommunities,
    follow: id => (),
    unfollow: id => (),
    join: id => (),
    getMembers: getMembers,
    getPapers: id => ([]),
    getFile: (documentId, fileId) => ({})
};

const invitations = {
    accept: function acceptInvitation(id) { },
    decline: function declineInvitation(id) {},
    create : function create(data) {}
};

const getSubjectAreas = () => ([]);





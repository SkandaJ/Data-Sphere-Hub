const sessionIdUserMap = new Map();
const sessionIdAdminMap  = new Map();
function setUser(id, user){
    sessionIdUserMap.set(id, user);
}

function getUser(id){
    return sessionIdUserMap.get(id);
}
module.exports={
    setUser,
    getUser,
}
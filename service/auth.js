const sessionIdUserMap = new Map();
const sessionIdDeveloperMap  = new Map();
function setUser(id, user){
    sessionIdUserMap.set(id, user);
}

function getUser(id){
    return sessionIdUserMap.get(id);
}
function setDev(id, dev){
    sessionIdDeveloperMap.set(id, dev);
}

function getDev(id){
    return sessionIdDeveloperMap.get(id);
}
module.exports={
    setUser,
    getUser,
    setDev,
    getDev,
}
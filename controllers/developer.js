const Dev = require('../models/dev');
const {v4: uuidv4} = require('uuid');
const{setDev} = require('../service/auth');
async function handleDevLogin(req, res){
    const {email, password} = req.body;
    const dev = await Dev.findOne({email, password,});
    if(!dev)
        return res.render('login', {
        error:"Invalid username or password",
    });
    const sessionId = uuidv4();
    setDev(sessionId, dev);
    res.cookie('did', sessionId);
    return res.redirect('/dev_home');
}
module.exports={
    handleDevLogin,
}
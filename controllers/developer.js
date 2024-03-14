const Dev = require('../models/dev');
const DASH = require('../models/dashboards');
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

async function handleDevUpload(req, res){
    const {url, createdFor} = req.body;
    await DASH.create({
        url,
        createdFor,
    });
    return res.render('dev_upload', {
        success:"Dashboard has been uploaded successfully"
    });
}
module.exports={
    handleDevLogin,
    handleDevUpload,
}
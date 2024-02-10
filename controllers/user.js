const User=require('../models/user')
const REQ = require('../models/requests')
const {v4: uuidv4} = require('uuid');
const{setUser} = require('../service/auth');
async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name, 
        email,
        password,
    });
    return res.redirect('/')
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password,});
    if(!user)
        return res.render('login', {
        error:"Invalid username or password",
    });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);
    return res.redirect('/');
}

async function handleUpload(req, res){
    const {title, description} = req.body;
    const filePath = req.file.path;
    await REQ.create({
        title,
        file : filePath,
        description,
    });
    return res.redirect('/upload');
}
module.exports={
    handleUserSignUp,
    handleUserLogin,
    handleUpload,
}
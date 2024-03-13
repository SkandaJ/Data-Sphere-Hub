const express =  require('express');
const router = express.Router();
const path = require('path');
const DASH = require('../models/dashboards');
const REQ = require('../models/requests');
const Accepted = require('../models/accepted');
router.get('/landing_page', (req, res)=>{
    res.render('landing_page');
});
router.get('/', async (req, res)=>{
    if(!req.user) return res.redirect('/login');
    const alldash = await DASH.find({createdFor: req.user.email});
    res.render('home', {
        dash: alldash
    });
});
router.get('/signup', (req, res)=>{
    return res.render('signup');
});
router.get('/login', (req, res)=>{
    return res.render('login');
});
router.get('/logout', (req, res) => {
    if (req.user) {
        res.clearCookie('uid');
        res.redirect('/landing_page');
    } else if(req.dev) {
        res.clearCookie('did');
        res.redirect('/landing_page');
    } 
    else {
        res.redirect('/landing_page');
    }
});

router.get('/upload', (req, res)=>{
    if(!req.user) return res.redirect('/login');
    return res.render('upload');
});

router.get('/dev_home', async(req, res)=>{
    if(!req.dev) return res.redirect('/login');
    const allreq = await REQ.find({});
    return res.render('dev_home', {
        req:allreq
    });
});

router.get('/download', async (req, res) => {
    const filePath = req.query.path;
    const absoluteFilePath = path.join(__dirname, '../', filePath); 
    res.download(absoluteFilePath);
    await REQ.deleteOne({file: filePath});
});

router.get('/services', async(req, res) => {
    const service = await DASH.find({});
    return res.render('services', {
        serv: service
    });
});

router.get('/dev_upload', async(req, res)=>{
    if(!req.dev) return res.redirect('/login');
    return res.render('dev_upload');
});
module.exports = router;
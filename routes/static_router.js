const express =  require('express');
const router = express.Router();
const DASH = require('../models/dashboards');
router.get('/landing_page', (req, res)=>{
    res.render('landing_page');
})
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
})
router.get('/logout', (req, res) => {
    if (req.user) {
        res.clearCookie('uid');
        res.redirect('/landing_page');
    } else {
        res.redirect('/landing_page');
    }
});

module.exports = router;
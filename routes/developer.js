const express = require('express');
const {handleDevLogin}=require("../controllers/developer");
const router=express.Router();
router.post('/login', handleDevLogin);
module.exports=router;
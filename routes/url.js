const express=require('express');
const router=express.Router();
const {handleGenerateNewUrl,handleGetanalytics}=require('../controllers/url');

router.post('/',handleGenerateNewUrl);

router.get('/analytics/:shortId',handleGetanalytics)

module.exports=router;
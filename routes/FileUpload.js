const express = require('express');
const router = express.Router();
// import controllers to handle routes logic via handlers functions
const {localFileUpload,imageUpload,videoUpload,imageSizeReducer} = require('../Controllers/fileUpload');

// route to upload file to local storage
router.post('/localFileUpload',localFileUpload)
router.post('/imageUpload',imageUpload);
router.post('/videoUpload',videoUpload);
router.post('/imageSizeReducer',imageSizeReducer);
module.exports = router;

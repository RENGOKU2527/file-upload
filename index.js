// app create
const express = require('express');
const app = express();
// PORT find krna h

require('dotenv').config();
const PORT = process.env.PORT || 3000;
// middlewares lgane h
app.use(express.json());
const fileupload = require('express-fileupload');
const os = require('os');
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
    createParentPath: true,
}));

// db connect krna h
const db = require('./Config/database');
db.connect();
// cloud se connect krna h
const cloudinary = require('./Config/cloudinary');
cloudinary.cloudinaryConnect();
//  api routes mount krne h
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);
// activate server 
app.listen(PORT ,() => {
    console.log(`App is running at ${PORT}`);
} )

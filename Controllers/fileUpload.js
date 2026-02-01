const File = require('../models/File');
// creating instance of cloudinary
const cloudinary = require('cloudinary').v2;

// handler function to upload file to local storage
exports.localFileUpload = async(req,res) => {
    try{
        // fetch file details from request
        const file = req.files.file;
        console.log("FILE DETAILS",file);
         
        // create path where file needs to be stored on server
         let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}` ;
         console.log("FILE PATH",path);
         // mv() method will place the files to upload directory
         file.mv(path,(err) => {
            console.log(err);
         });
         res.json({
            sucess: true,
            message:"Local File Uploaded Successfully",
         });
    }
    catch(error) {
        console.log(error);
    }
}

    function isFileTypeSupported(type,supportedTypes){
        return supportedTypes.includes(type);
    }

    // we will create a function to upload file to cloudinary 
    // we will use the function various times so we made it a function
    // it will be a async function because cloudinary upload is an async operation
    async function uploadFileToCloudinary(file,folder,quality) {
        const options = {folder};
        console.log("temp file path",file.tempFilePath);

         if(quality){
            options.quality = quality;
        }
        options.resource_type = "auto";
       return await cloudinary.uploader.upload(file.tempFilePath,options);
    }

// image handler function to upload image to cloudinary

exports.imageUpload = async(req,res) => {
    try {
        // fetch file details from request
        const { name, tags, email } = req.body || {};
        const file = req?.files?.imageFile;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file found. Send file in form-data with key 'imageFile'.",
            });
        }
        console.log(file);

        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.').pop().toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            })
        }
        // file format supported hai
        console.log("Uploading to cloudinary");
        const response = await uploadFileToCloudinary(file,"MediaFolder");
        console.log(response);

        // db me entry create krni h
        const Filedata = await File.create( {
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success: true,
            imageUrl:response.secure_url,
            message: "Image successfully Uploaded",
        })
    }
    catch(error){
        console.error(error),
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

// video upload krne ka handler 
  exports.videoUpload = async(req,res) => {
    try{
        // fetch data from req body
        const {name,tags,email} = req.body || {};
        console.log(name,tags,email);
        // Debug: check what files are received
        console.log("Received files:", req.files ? Object.keys(req.files) : 'No files object');
        // we will create the key name as videoFile
        const file = req?.files?.videoFile;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file found. Send file in form-data with key 'videoFile'.",
                receivedKeys: req.files ? Object.keys(req.files) : []
            });
        }

        // Validation 
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File Type:" , fileType);

        // TODO: add a upper limit of 5MB for Video

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }
         // file format supported hai
        console.log("Uploading to cloudinary");
        const response = await uploadFileToCloudinary(file,"MediaFolder");
        console.log(response);

         // db me entry create krni h
        const Filedata = await File.create( {
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success: true,
            imageUrl:response.secure_url,
            message: "Video successfully Uploaded",
        })

    }
    catch(error){
         console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
  }

  // imageSizeReducer function
  exports.imageSizeReducer = async(req,res) => {
    try {
        // fetch file details from request
        const { name, tags, email } = req.body || {};
        const file = req?.files?.imageFile;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file found. Send file in form-data with key 'imageFile'.",
            });
        }
        console.log(file);

        // validation
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.').pop().toLowerCase();

         // TODO: add a upper limit of 5MB for Image

        if(!isFileTypeSupported(fileType,supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported",
            })
        }
        // file format supported hai
        console.log("Uploading to cloudinary");
        const response = await uploadFileToCloudinary(file,"MediaFolder",30);
        console.log(response);

        // db me entry create krni h
        const Filedata = await File.create( {
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.json({
            success: true,
            imageUrl:response.secure_url,
            message: "Image successfully Uploaded",
        })
    }
    catch {
         console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
  }
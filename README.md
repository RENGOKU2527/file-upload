# File Upload API

A Node.js REST API for uploading files locally and to **Cloudinary**, with optional email notifications and image size reduction.

## Features

- **Local file upload** – Save files to the server filesystem
- **Image upload to Cloudinary** – Upload images (jpg, jpeg, png) to Cloudinary and store metadata in MongoDB
- **Video upload to Cloudinary** – Upload videos (mp4, mov) to Cloudinary and store metadata in MongoDB
- **Image size reducer** – Upload images with reduced quality (e.g. 30%) to Cloudinary for smaller file sizes
- **Email notification** – Send an email when a file is saved (optional; requires SMTP config in `.env`)
- **MongoDB** – Store file metadata (name, tags, email, imageUrl) for image and video uploads

## Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose)  
- **Cloud storage:** Cloudinary  
- **File handling:** express-fileupload  
- **Email:** Nodemailer  
- **Config:** dotenv  

## Project Structure

```
FileUpload/
├── Config/
│   ├── cloudinary.js    # Cloudinary config
│   └── database.js      # MongoDB connection
├── Controllers/
│   └── fileUpload.js    # Upload handlers (local, image, video, imageSizeReducer)
├── models/
│   └── File.js         # File schema + post-save email hook
├── routes/
│   └── FileUpload.js   # API routes
├── index.js            # App entry, middleware, server
├── package.json
└── .env                # Environment variables (not committed)
```

## Setup

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd FileUpload
   npm install
   ```

2. **Environment variables**

   Create a `.env` file in the project root with:

   ```env
   PORT=4000
   MONGODB_URL=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<dbname>
   CLOUD_NAME=<your-cloudinary-cloud-name>
   API_KEY=<your-cloudinary-api-key>
   API_SECRET=<your-cloudinary-api-secret>

   # Optional: for email after file save
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USER=your-email@gmail.com
   MAIL_PASS=your-app-password
   ```

3. **Run**

   ```bash
   npm start
   # or with auto-reload
   npm run dev
   ```

   Server runs at `http://localhost:4000` (or the port in `PORT`).

## API Endpoints

Base path: **`/api/v1/upload`**

| Method | Endpoint            | Description                    | Body (form-data)                          |
|--------|---------------------|--------------------------------|-------------------------------------------|
| POST   | `/localFileUpload`  | Upload file to server          | `file` (File)                             |
| POST   | `/imageUpload`      | Upload image to Cloudinary     | `imageFile` (File), optional: name, tags, email |
| POST   | `/videoUpload`      | Upload video to Cloudinary     | `videoFile` (File), optional: name, tags, email |
| POST   | `/imageSizeReducer` | Upload image with reduced size | `imageFile` (File), optional: name, tags, email |

- Use **Postman** or similar: set **Body** to **form-data**, add the file with the key shown, and any optional text fields.

## License

ISC

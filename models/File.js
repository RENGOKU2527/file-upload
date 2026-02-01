const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },    email: {
        type: String,
    }
})
// post middleware
fileSchema.post("save", async function (doc) {
    try {
        console.log("DOC", doc);
        // Only send email if SMTP is configured (otherwise ECONNREFUSED on 127.0.0.1:587)
        const host = process.env.MAIL_HOST;
        const user = process.env.MAIL_USER;
        const pass = process.env.MAIL_PASS;
        if (!host || !user || !pass) {
            console.log("Email skipped: set MAIL_HOST, MAIL_USER, MAIL_PASS in .env to send mail.");
            return;
        }
        if (!doc.email) {
            console.log("Email skipped: no recipient email on document.");
            return;
        }

        const transporter = nodemailer.createTransport({
            host,
            port: Number(process.env.MAIL_PORT) || 587,
            secure: process.env.MAIL_PORT === "465",
            auth: { user, pass },
        });

        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM || `Codehelp - by Harsh Nadar`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello Jee </h2> <p> File Uploaded  View here: <a href="${doc.imageUrl}"> ${doc.imageUrl}</a></p>`,
        });
        console.log("INFO", info);
    } catch (error) {
        console.error("Mail error:", error.message);
    }
});

const File = mongoose.model('File',fileSchema);
module.exports = File;
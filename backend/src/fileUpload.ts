import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the directory exists
const uploadDir = path.join(__dirname, "public/assets");

if (!fs.existsSync(uploadDir)) {
    console.log("Creating upload directory");
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } });

export { upload };
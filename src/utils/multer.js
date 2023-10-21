import multer from "multer";
import { nanoid } from "nanoid";

export const fileValidation = {
    image: ["image/jpeg", "image/png", "image/gif"],
    file: ["application/pdf", "application/msword"]
}

export function fileUpload(ValidationFile){

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads");
        },
        filename: (req, file, cb) => {
            // generate unique File Name
            const uniqueFileName = nanoid() + '_' + file.originalname;
            file.finalDest = `uploads/${uniqueFileName}`
            cb(null, uniqueFileName);
        }
    });

    function fileFilter(req, file, cb) {
        if (ValidationFile.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("In-vaild format"), false);
        }
    }

    const upload = multer({ dest:"uploads", fileFilter, storage });
    return upload;
}
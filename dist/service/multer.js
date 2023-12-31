"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadFile = (upload_Type, uploadCount) => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            let pathName = path_1.default.join(__dirname, `../storage/`, req.params.userId);
            let stat = null;
            try {
                stat = fs_1.default.statSync(pathName);
            }
            catch (err) {
                fs_1.default.mkdirSync(pathName);
            }
            if (stat && !stat.isDirectory()) {
                throw new Error('Directory cannot be created');
            }
            cb(null, pathName);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });
    const upload = (0, multer_1.default)({ storage: storage, dest: `../storage/` });
    if (upload_Type === "multiple") {
        return upload.array("file", uploadCount);
    }
    return upload.single("file");
};
exports.uploadFile = uploadFile;

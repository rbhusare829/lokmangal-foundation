import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
  },
});

const IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const DOC_FIELDS = new Set(["document"]);

function fileFilter(req, file, cb) {
  if (DOC_FIELDS.has(file.fieldname)) {
    if (file.mimetype === "application/pdf") return cb(null, true);
    return cb(new Error("Only PDF files are allowed for this field"));
  }
  if (IMAGE_TYPES.has(file.mimetype)) return cb(null, true);
  return cb(new Error("Only PNG, JPEG, WEBP, or GIF images are allowed"));
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export function publicUrl(file) {
  return file ? `/uploads/${file.filename}` : undefined;
}

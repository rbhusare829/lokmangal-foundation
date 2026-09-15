import { body } from "express-validator";
import { GalleryImage } from "../models/GalleryImage.js";
import { createCrudRouter } from "./crudFactory.js";
import { upload, publicUrl } from "../middleware/upload.js";

export const galleryRouter = createCrudRouter(GalleryImage, {
  orderBy: ["sortOrder", "ASC"],
  fileFields: ["imageUrl"],
  uploadMiddleware: [upload.single("image")],
  validators: [
    body("category").isIn(["annapoorna", "jalsandharan", "vidyadaan", "vivah"]),
    body("titleEn").isString().trim().notEmpty(),
    body("titleMr").isString().trim().notEmpty(),
  ],
  toPayload: (req, existing) => ({
    category: req.body.category,
    titleEn: req.body.titleEn,
    titleMr: req.body.titleMr,
    sortOrder: req.body.sortOrder ?? existing?.sortOrder ?? 0,
    imageUrl: publicUrl(req.file) ?? existing?.imageUrl,
  }),
});

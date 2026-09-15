import { Router } from "express";
import { validationResult } from "express-validator";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "..", "..", "uploads");

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Only ever deletes files inside our own uploads/ dir, and only ones we generated
// (the seed-* prefix marks shared seed assets that multiple records may reference,
// so those are left alone rather than deleted out from under other records).
function deleteUploadedFile(url) {
  if (!url || !url.startsWith("/uploads/")) return;
  const filename = url.replace("/uploads/", "");
  if (filename.startsWith("seed-")) return;
  const filePath = path.join(uploadsDir, filename);
  fs.unlink(filePath, () => {});
}

export function createCrudRouter(
  Model,
  { uploadMiddleware = [], validators = [], toPayload = (req) => req.body, orderBy, fileFields = [] } = {}
) {
  const router = Router();

  router.get("/", async (req, res, next) => {
    try {
      const items = await Model.findAll(orderBy ? { order: [orderBy] } : undefined);
      res.json(items);
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/",
    requireAuth,
    ...uploadMiddleware,
    ...validators,
    handleValidation,
    async (req, res, next) => {
      try {
        const item = await Model.create(toPayload(req));
        res.status(201).json(item);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:id",
    requireAuth,
    ...uploadMiddleware,
    ...validators,
    handleValidation,
    async (req, res, next) => {
      try {
        const item = await Model.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: "Not found" });
        const before = fileFields.map((field) => item[field]);
        await item.update(toPayload(req, item));
        fileFields.forEach((field, i) => {
          if (before[i] && before[i] !== item[field]) deleteUploadedFile(before[i]);
        });
        res.json(item);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete("/:id", requireAuth, async (req, res, next) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: "Not found" });
      fileFields.forEach((field) => deleteUploadedFile(item[field]));
      await item.destroy();
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  return router;
}

import { body } from "express-validator";
import { TeamMember } from "../models/TeamMember.js";
import { createCrudRouter } from "./crudFactory.js";
import { upload, publicUrl } from "../middleware/upload.js";

export const teamRouter = createCrudRouter(TeamMember, {
  orderBy: ["sortOrder", "ASC"],
  fileFields: ["photoUrl"],
  uploadMiddleware: [upload.single("image")],
  validators: [
    body("name").isString().trim().notEmpty(),
    body("roleEn").isString().trim().notEmpty(),
    body("roleMr").isString().trim().notEmpty(),
  ],
  toPayload: (req, existing) => ({
    name: req.body.name,
    roleEn: req.body.roleEn,
    roleMr: req.body.roleMr,
    sortOrder: req.body.sortOrder ?? existing?.sortOrder ?? 0,
    photoUrl: publicUrl(req.file) ?? existing?.photoUrl,
  }),
});

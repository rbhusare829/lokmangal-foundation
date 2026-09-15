import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const GalleryImage = sequelize.define("GalleryImage", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category: {
    type: DataTypes.ENUM("annapoorna", "jalsandharan", "vidyadaan", "vivah"),
    allowNull: false,
  },
  titleEn: { type: DataTypes.STRING, allowNull: false },
  titleMr: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TeamMember = sequelize.define("TeamMember", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  roleEn: { type: DataTypes.STRING, allowNull: false },
  roleMr: { type: DataTypes.STRING, allowNull: false },
  photoUrl: { type: DataTypes.STRING, allowNull: true },
  sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "user", timestamps: true, createdAt: "created_at", updatedAt: false }
);


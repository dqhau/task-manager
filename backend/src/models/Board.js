import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Board = sequelize.define(
  "Board",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "board", timestamps: false }
);

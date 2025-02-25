import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import {List} from "./List.js";

export const Card = sequelize.define(
  "Card",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: List, key: "id" },
    },
    title: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    start_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    due_date: { type: DataTypes.DATE },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_archived: { type: DataTypes.BOOLEAN, defaultValue: false },
    position: { type: DataTypes.INTEGER },
  },
  { tableName: "card", timestamps: false }
);


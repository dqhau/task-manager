import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import {Board} from "./Board.js";

export const List = sequelize.define(
  "List",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    board_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Board, key: "id" } },
  },
  { tableName: "list", timestamps: false }
);


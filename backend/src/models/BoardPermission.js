import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import {User}from "./User.js";
import {Board} from "./Board.js";

export const BoardPermission = sequelize.define(
  "BoardPermission",
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
    board_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Board, key: "id" } },
    permission_type: { type: DataTypes.INTEGER, allowNull: false },
    is_started: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "board_permission", timestamps: false }
);

// Thiết lập khóa chính tổng hợp
BoardPermission.removeAttribute("id");
BoardPermission.primaryKeyAttributes = ["user_id", "board_id"];

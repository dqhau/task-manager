import { User } from "./User.js";
import { Board } from "./Board.js";
import { BoardPermission } from "./BoardPermission.js";
import { List } from "./List.js";
import { Card } from "./Card.js";

// Quan hệ giữa Board và List
Board.hasMany(List, { foreignKey: "board_id", onDelete: "CASCADE" });
List.belongsTo(Board, { foreignKey: "board_id" });

// Quan hệ giữa List và Card
List.hasMany(Card, { foreignKey: "list_id", onDelete: "CASCADE" });
Card.belongsTo(List, { foreignKey: "list_id" });

// Quan hệ giữa User và Board (BoardPermission)
User.belongsToMany(Board, { through: BoardPermission, foreignKey: "user_id" });
Board.belongsToMany(User, { through: BoardPermission, foreignKey: "board_id" });

export { User, Board, BoardPermission, List, Card };

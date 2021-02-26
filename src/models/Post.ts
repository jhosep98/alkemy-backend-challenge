import Sequelize from "sequelize";
import { sequelize } from "../database";

const Post = sequelize.define(
  "posts",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.TEXT,
    },
    image_url: {
      type: Sequelize.TEXT,
    },
    created_at: {
      type: Sequelize.DATE,
    },
    category_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

export default Post;

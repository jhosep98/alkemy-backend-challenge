import Sequelize from "sequelize";
import { sequelize } from "../database";

const Post = sequelize.define(
  "posts",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
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
    category: {
      type: Sequelize.STRING,
    },
    created_at: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

export default Post;

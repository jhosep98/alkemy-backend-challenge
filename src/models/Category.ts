import Sequelize, { Model } from "sequelize";
import { sequelize } from "../database";

interface CategoryAttributes {
  id: number;
  name: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id: number;
  public name: string;
}

Category.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    tableName: "categories",
    timestamps: false,
  }
);

export default Category;

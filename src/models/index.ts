import Category from "./Category";
import Post from "./Post";

Category.hasMany(Post, { foreignKey: "category_id" });
Post.belongsTo(Category, { foreignKey: "category_id" });

export { Category, Post };

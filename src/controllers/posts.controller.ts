import { Request, Response } from "express";
import Post from "../models/Post";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll({
    order: [["id", "DESC"]],
    attributes: ["id", "title", "image_url", "category", "created_at"],
  });
  res.json({
    data: posts,
  });
};

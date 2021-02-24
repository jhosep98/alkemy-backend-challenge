import { Request, Response } from "express";
import Post from "../models/Post";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll({
    order: [["created_at", "DESC"]],
    attributes: ["id", "title", "image_url", "category", "created_at"],
  });
  res.json({ data: posts });
};

export const getOnePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await Post.findOne({
    where: {
      id,
    },
  });

  if (post) {
    res.json({
      data: post,
    });
  } else {
    res.status(404).json({
      message: `post with id '${id}' not found`,
      data: {},
    });
  }
};

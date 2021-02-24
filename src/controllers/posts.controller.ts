import { Request, Response } from "express";
import Post from "../models/Post";

// Get all posts:
export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll({
    order: [["created_at", "DESC"]],
    attributes: ["id", "title", "image_url", "category", "created_at"],
  });
  return res.json({ data: posts });
};

// Get a post by id:
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

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  const { title, body, image_url, category, created_at } = req.body;

  try {
    let newPost = await Post.create(
      {
        title,
        body,
        image_url,
        category,
        created_at,
      },
      {
        fields: ["title", "body", "image_url", "category", "created_at"],
      }
    );
    if (newPost) {
      res.json({
        message: "Post created successfully",
        data: newPost,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "something goes wrong",
      data: {},
    });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await Post.destroy({
    where: {
      id,
    },
  });
  if (post) {
    res.json({
      message: `Post deleted`,
    });
  } else {
    res.status(404).json({
      message: `could not delete the post with id: ${id}`,
    });
  }
};

// Update post
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body, image_url, category, created_at } = req.body;

  const posts = await Post.findAll({
    attributes: ["id", "title", "body", "image_url", "category", "created_at"],
    where: {
      id,
    },
  });

  if (posts.length > 0 && id) {
    posts.forEach(async (post) => {
      await post.update({
        title,
        body,
        image_url,
        category,
        created_at,
      });
    });
    res.json({
      message: "Post Updated successfully",
      data: posts,
    });
  } else {
    res.status(500).json({
      message: `error updating post`,
    });
  }
};

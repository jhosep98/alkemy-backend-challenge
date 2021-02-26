import { Request, Response } from "express";
import Post from "../models/Post";
import Category from "../models/Category";

// Get all posts:
export const getPosts = async (req: Request, res: Response) => {
  Post.hasMany(Category);
  const posts = await Post.findAll({
    order: [["created_at", "DESC"]],
    attributes: ["id", "title", "image_url", "created_at", "category_id"],
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
  const { title, body, image_url, category_name, created_at } = req.body;

  try {
    const [category] = await Category.findOrCreate({
      where: {
        name: category_name,
      },
    });

    let newPost = await Post.create({
      title,
      body,
      image_url,
      category_id: category.id,
      created_at,
    });

    if (newPost) {
      res.json({
        message: "Post created successfully",
        data: newPost,
      });
    }
  } catch (err) {
    console.log(err);
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
  const { title, body, image_url, category_name, created_at } = req.body;

  const posts = await Post.findAll({
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
        category_name,
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

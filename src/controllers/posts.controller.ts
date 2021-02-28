import { Request, Response } from "express";
import { Post, Category } from "../models/index";

// Get all posts:
export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll({
    order: [["created_at", "DESC"]],
    attributes: ["id", "title", "image_url", "created_at"],
    include: Category.name,
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
  const POST_FAILED: string = "something goes wrong";
  const POST_SUCCESS: string = "Post created successfully";
  try {
    const { title, body, image_url, category_name, created_at } = req.body;

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
        message: POST_SUCCESS,
        data: newPost,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: POST_FAILED,
      data: {},
    });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const POST_DELETED = "Post deleted";
  const post = await Post.destroy({
    where: {
      id,
    },
  });

  if (post) {
    res.json({
      message: POST_DELETED,
    });
  } else {
    res.status(404).json({
      message: `could not delete the post with id: ${id}`,
    });
  }
};

// Update post
export const updatePost = async (req: Request, res: Response) => {
  const NO_DATA: number = 0;
  const POST_UPDATED: string = "Post Updated successfully";
  const { id } = req.params;
  const { title, body, image_url, category_name, created_at } = req.body;

  const posts = await Post.findAll({
    where: {
      id,
    },
  });

  if (posts.length > NO_DATA && id) {
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
      message: POST_UPDATED,
      data: posts,
    });
  } else {
    res.status(500).json({
      message: `error updating post`,
    });
  }
};

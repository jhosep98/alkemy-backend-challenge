import { Router } from "express";
import {
  createPost,
  deletePost,
  getOnePost,
  getPosts,
  updatePost,
} from "../controllers/posts.controller";

const router = Router();

router.route("/").get(getPosts);
router.route("/:id").get(getOnePost);
router.route("/").post(createPost);
router.route("/:id").delete(deletePost);
router.route("/:id").patch(updatePost);

export default router;

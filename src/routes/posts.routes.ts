import { Router } from "express";
import {
  createPost,
  deletePost,
  getOnePost,
  getPosts,
} from "../controllers/posts.controller";

const router = Router();

router.route("/").get(getPosts);
router.route("/:id").get(getOnePost);
router.route("/").post(createPost);
router.route("/:id").delete(deletePost);

export default router;

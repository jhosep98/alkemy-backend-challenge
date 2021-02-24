import { Router } from "express";
import {
  createPost,
  getOnePost,
  getPosts,
} from "../controllers/posts.controller";

const router = Router();

router.route("/").get(getPosts);
router.route("/:id").get(getOnePost);
router.route("/").post(createPost);

export default router;

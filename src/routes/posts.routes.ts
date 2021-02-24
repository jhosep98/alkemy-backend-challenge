import { Router } from "express";
import { getOnePost, getPosts } from "../controllers/posts.controller";

const router = Router();

router.route("/").get(getPosts);
router.route("/:id").get(getOnePost);

export default router;

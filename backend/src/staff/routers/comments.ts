import { Router } from "express";
import { body } from "express-validator";
import { stringConfig } from "../../utils/globals";
import {
  allowIfAuthenticated,
  isStaff,
} from "../../middleware/auth-middleware";
import {
  deleteComment,
  fetchComments,
  fetchIndividualComment,
  updateComment,
} from "../handlers/comments";

const router = Router();

// middleware
router.use(allowIfAuthenticated);
router.use(isStaff);

// fetch comments
router.get("/", fetchComments);

// fetch individual comment
router.get("/:id", fetchIndividualComment);

// update comment
router.put(
  "/:id",
  body("message").isString().isLength(stringConfig),
  updateComment,
);

// delete comment
router.delete("/:id", deleteComment);

export default router;

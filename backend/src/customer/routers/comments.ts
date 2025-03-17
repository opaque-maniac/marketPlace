import { Router } from "express";
import {
  deleteComment,
  fetchCommentReplies,
  fetchIndividualComment,
  replyToComment,
  updateComment,
} from "../handlers/comments";
import {
  allowIfAuthenticated,
  isCustomer,
} from "../../middleware/auth-middleware";
import { body } from "express-validator";

const router = Router();

// fetch comment
router.get("/:id", fetchIndividualComment);

// fetch comment replies
router.get("/:id/replies", fetchCommentReplies);

// reply to a comment
router.post(
  "/:id",
  allowIfAuthenticated,
  isCustomer,
  body("message").isString(),
  replyToComment,
);

// update comment
router.put(
  "/:id",
  allowIfAuthenticated,
  isCustomer,
  body("message").isString(),
  updateComment,
);

// delete comment
router.delete("/:id", allowIfAuthenticated, isCustomer, deleteComment);

export default router;

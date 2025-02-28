import { Router } from "express";
import {
  deleteMisconduct,
  fetchIndividualMisconduct,
  fetchMisconducts,
  updateMisconduct,
} from "../handlers/misconducts";
import { body } from "express-validator";
import {
  allowIfAuthenticated,
  isNotOwnMisconduct,
  isStaff,
} from "../../middleware/auth-middleware";

const router = Router();

router.use(allowIfAuthenticated);
router.use(isStaff);

router.get("/", fetchMisconducts);
router.get("/:id", fetchIndividualMisconduct);
router.put(
  "/:id",
  body("misconduct").isString().isLength({ min: 2, max: 225 }),
  body("description").isString().isLength({ min: 2, max: 500 }),
  body("response")
    .isString()
    .isIn(["WARN_USER", "DISABLE_PROFILE", "DELETE_PROFILE"]),
  isNotOwnMisconduct,
  updateMisconduct,
);
router.delete("/:id", isNotOwnMisconduct, deleteMisconduct);

export default router;

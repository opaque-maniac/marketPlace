import { Router } from "express";
import { allowIfAuthenticated } from "../../middleware/auth-middleware";
import {
  fetchComplaints,
  fetchComplaint,
  fetchComplaintProfiles,
} from "../handlers/complaints";

const router = Router();

router.use(allowIfAuthenticated);

router.get("/", fetchComplaints);
router.get("/:id", fetchComplaint);
router.get("/:id/profiles", fetchComplaintProfiles);

export default router;

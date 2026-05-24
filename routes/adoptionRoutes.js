import express from "express";
import {
  submitAdoption,
  getMyRequests,
  getRequestsForPet,
  updateRequestStatus,
  cancelRequest,
} from "../controllers/adoptionController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// All adoption routes are private
router.post("/", verifyToken, submitAdoption);
router.get("/my-requests", verifyToken, getMyRequests);
router.get("/pet/:petId", verifyToken, getRequestsForPet);
router.patch("/:id/status", verifyToken, updateRequestStatus);
router.delete("/:id", verifyToken, cancelRequest);

export default router;

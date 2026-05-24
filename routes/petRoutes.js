import express from "express";
import {
  getAllPets,
  getFeaturedPets,
  getPetById,
  addPet,
  updatePet,
  deletePet,
  getMyListings,
} from "../controllers/petController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllPets);
router.get("/featured", getFeaturedPets);
router.get("/:id", getPetById);

// Private routes
router.post("/", verifyToken, addPet);
router.put("/:id", verifyToken, updatePet);
router.delete("/:id", verifyToken, deletePet);
router.get("/user/my-listings", verifyToken, getMyListings);

export default router;
// pet routes

import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// POST /api/adoptions - Submit adoption request
export const submitAdoption = async (req, res) => {
  try {
    const db = getDB();
    const { petId, petName, pickupDate, message } = req.body;

    // Check pet exists and not adopted
    const pet = await db
      .collection("pets")
      .findOne({ _id: new ObjectId(petId) });

    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.status === "adopted")
      return res.status(400).json({ message: "Pet is already adopted" });

    // Owner cannot adopt own pet
    if (pet.ownerEmail === req.user.email)
      return res
        .status(403)
        .json({ message: "You cannot adopt your own pet" });

    // Check duplicate request
    const existing = await db.collection("adoptions").findOne({
      petId,
      requesterEmail: req.user.email,
    });
    if (existing)
      return res
        .status(400)
        .json({ message: "You already submitted a request for this pet" });

    const adoption = {
      petId,
      petName,
      pickupDate,
      message,
      requesterEmail: req.user.email,
      requesterName: req.user.name || req.user.email,
      status: "pending",
      requestDate: new Date(),
    };

    const result = await db.collection("adoptions").insertOne(adoption);
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit adoption request" });
  }
};

// GET /api/adoptions/my-requests - User's own requests
export const getMyRequests = async (req, res) => {
  try {
    const db = getDB();
    const requests = await db
      .collection("adoptions")
      .find({ requesterEmail: req.user.email })
      .sort({ requestDate: -1 })
      .toArray();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

// GET /api/adoptions/pet/:petId - Requests for owner's pet
export const getRequestsForPet = async (req, res) => {
  try {
    const db = getDB();

    // Verify requester is pet owner
    const pet = await db
      .collection("pets")
      .findOne({ _id: new ObjectId(req.params.petId) });

    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.ownerEmail !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });

    const requests = await db
      .collection("adoptions")
      .find({ petId: req.params.petId })
      .sort({ requestDate: -1 })
      .toArray();

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

// PATCH /api/adoptions/:id/status - Approve or Reject
export const updateRequestStatus = async (req, res) => {
  try {
    const db = getDB();
    const { status } = req.body; // "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const adoption = await db
      .collection("adoptions")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!adoption) return res.status(404).json({ message: "Request not found" });

    // Verify ownership of the pet
    const pet = await db
      .collection("pets")
      .findOne({ _id: new ObjectId(adoption.petId) });

    if (!pet || pet.ownerEmail !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });

    // If approving: mark pet as adopted + reject all other requests
    if (status === "approved") {
      await db
        .collection("pets")
        .updateOne(
          { _id: new ObjectId(adoption.petId) },
          { $set: { status: "adopted" } }
        );

      // Reject all other pending requests for this pet
      await db.collection("adoptions").updateMany(
        {
          petId: adoption.petId,
          _id: { $ne: new ObjectId(req.params.id) },
          status: "pending",
        },
        { $set: { status: "rejected" } }
      );
    }

    // Update this request status
    await db
      .collection("adoptions")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { status } }
      );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update request status" });
  }
};

// DELETE /api/adoptions/:id - Cancel request
export const cancelRequest = async (req, res) => {
  try {
    const db = getDB();
    const adoption = await db
      .collection("adoptions")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!adoption) return res.status(404).json({ message: "Request not found" });
    if (adoption.requesterEmail !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });

    await db
      .collection("adoptions")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel request" });
  }
};

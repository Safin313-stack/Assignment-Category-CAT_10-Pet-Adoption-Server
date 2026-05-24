import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// GET /api/pets - All pets with search, filter
export const getAllPets = async (req, res) => {
  try {
    const db = getDB();
    const { search, species, sort } = req.query;

    const query = { status: { $ne: "adopted" } };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (species && species !== "all") {
      query.species = { $in: [species] };
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { adoptionFee: 1 };
    if (sort === "price_desc") sortOption = { adoptionFee: -1 };
    if (sort === "name_asc") sortOption = { name: 1 };

    const pets = await db.collection("pets").find(query).sort(sortOption).toArray();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pets", error: err.message });
  }
};

// GET /api/pets/featured - 6 latest available pets
export const getFeaturedPets = async (req, res) => {
  try {
    const db = getDB();
    const pets = await db
      .collection("pets")
      .find({ status: { $ne: "adopted" } })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch featured pets" });
  }
};

// GET /api/pets/:id - Single pet
export const getPetById = async (req, res) => {
  try {
    const db = getDB();
    const pet = await db
      .collection("pets")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pet" });
  }
};

// GET /api/pets/user/my-listings - Owner's pets
export const getMyListings = async (req, res) => {
  try {
    const db = getDB();
    const pets = await db
      .collection("pets")
      .find({ ownerEmail: req.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    const total = pets.length;
    const available = pets.filter((p) => p.status === "available").length;
    const adopted = pets.filter((p) => p.status === "adopted").length;

    res.json({ pets, stats: { total, available, adopted } });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

// POST /api/pets - Add pet
export const addPet = async (req, res) => {
  try {
    const db = getDB();
    const pet = {
      ...req.body,
      ownerEmail: req.user.email,
      status: "available",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("pets").insertOne(pet);
    res.status(201).json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Failed to add pet" });
  }
};

// PUT /api/pets/:id - Update pet
export const updatePet = async (req, res) => {
  try {
    const db = getDB();
    const pet = await db
      .collection("pets")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.ownerEmail !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });

    const { _id, ...updateData } = req.body;
    const result = await db
      .collection("pets")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { ...updateData, updatedAt: new Date() } }
      );

    res.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: "Failed to update pet" });
  }
};

// DELETE /api/pets/:id - Delete pet
export const deletePet = async (req, res) => {
  try {
    const db = getDB();
    const pet = await db
      .collection("pets")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.ownerEmail !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });

    await db.collection("pets").deleteOne({ _id: new ObjectId(req.params.id) });
    // Also delete related adoption requests
    await db
      .collection("adoptions")
      .deleteMany({ petId: req.params.id });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete pet" });
  }
};

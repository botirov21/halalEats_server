const { Router } = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createNewMosque,
  getAllMosques,
  getMosqueById,
  updateMosque,
  deleteMosque,
  likeMosque,
} = require("../controller/mosque.controller");

const router = Router();

// Mosque routes
router.post("/addMosque", createNewMosque);
router.get("/allMosques", getAllMosques);
router.get("/:id", getMosqueById);
router.put("/:id", updateMosque);
router.delete("/:id", deleteMosque);

// New routes for liking  Mosque
router.put("/:id/like", requireAuth, likeMosque);

module.exports = router;

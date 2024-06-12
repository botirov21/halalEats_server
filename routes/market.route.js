const { Router } = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createNewMarket,
  getAllMarkets,
  getMarketById,
  updateMarket,
  deleteMarket,
  likeMarket,
  unlikeMarket,
  commentMarket,
  uncommentMarket,
} = require("../controller/market.controller");

const router = Router();

// Market routes
router.post("/addMarket", createNewMarket);
router.get("/allRestaurants", getAllMarkets);
router.get("/:id", getMarketById);
router.put("/:id", updateMarket); 
router.delete("/:id", deleteMarket);

// New routes for liking and unliking a market
router.put("/:id/like", requireAuth, likeMarket);
router.put("/:id/unlike", requireAuth, unlikeMarket);

// New routes for commenting and uncommenting a market
router.put("/:id/comment", requireAuth, commentMarket);
router.put("/:id/uncomment/:commentId", requireAuth, uncommentMarket);

module.exports = router;

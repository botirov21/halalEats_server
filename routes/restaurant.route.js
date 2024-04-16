const { Router } = require("express");
const {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addMenu,
  likeRestaurant,
  unlikeRestaurant,
  commentRestaurant,
  uncommentRestaurant,
} = require("../controller/restaurant.controller");
const requireAuth = require("../middleware/requireAuth");

const router = Router();

// Restaurant routes
router.post("/addRestaurant", createNewRestaurant);
router.post("/:restaurantId/addMenu", addMenu);
router.get("/allRestaurants", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

// New routes for liking and unliking a restaurant
router.put("/:id/like", requireAuth, likeRestaurant);
router.put("/:id/unlike", requireAuth, unlikeRestaurant);

// New routes for commenting and uncommenting a restaurant
router.put("/:id/comment", requireAuth, commentRestaurant);
router.put("/:id/uncomment/:commentId", requireAuth, uncommentRestaurant);

module.exports = router;

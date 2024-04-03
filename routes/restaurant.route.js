const { Router } = require("express");
const { createNewRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } = require("../controller/restaurant.controller");

const router = Router();

router.post("/addRestaurant", createNewRestaurant);
router.get("/allRestaurants", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);


module.exports = router;

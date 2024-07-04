const asyncHandler = require("../middleware/async");
const Restaurant = require("../models/restaurant");
const Menu = require("../models/menu");

// @desc    Create data
// @route   PUT /api/addRestaurant
// @access  Public
exports.createNewRestaurant = asyncHandler(async (req, res, next) => {
    const newRestaurant = await Restaurant.create(req.body);
    res.status(200).json({
        success: true,
        data: newRestaurant,
    });
});

// @desc    Get all data
// @route   GET /api/allRestaurants
// @access  Public
exports.getAllRestaurants = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 10;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await Restaurant.countDocuments();
  
    const restaurant = await Restaurant.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: restaurant,    
    });
});

// @desc    Get data by id
// @route   GET /api/restaurants/:id
// @access  Public
exports.getRestaurantById = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.id;
    const data = await Restaurant.findById(restaurantId);

    res.status(200).json(data);
});

// @desc    Update data by id
// @route   GET /api/:id
// @access  Public
exports.updateRestaurant = asyncHandler(async (req, res) => {
    const restaurantId = await Restaurant.findById(req.params.id)
    if(!restaurantId){
        return res.status(404).json({
            success: false,
            error: "not found"
        })
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id,  req.body,{
        new: true,
        runValidators: true,
      });
    res.status(200).json({
        success: true, 
        data: updatedRestaurant,
    });
});


// @desc    Delete data by id
// @route   GET /api/:id
// @access  Public
exports.deleteRestaurant = asyncHandler(async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})

exports.addMenu = asyncHandler(async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { name, price, image } = req.body;

        // Create the menu item
        const menu = await Menu.create({ restaurantId, name, price, image });

        // Find the restaurant by ID and push the menu item's data into the menu array
        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
            $push: { 
                menu: { 
                    _id: menu._id,
                    name: menu.name,
                    price: menu.price,
                    image: menu.image
                } 
            } 
        }, { new: true });

        res.status(201).json({ message: 'Menu added successfully', menu, restaurant });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @desc    Like a restaurant
// @route   PUT /api/:id/like
// @access  Public
exports.likeRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
        return res.status(404).json({ success: false, error: "Restaurant not found" });
    }

    if (restaurant.likes.includes(userId)) {
        return res.status(400).json({ success: false, error: "You have already liked this restaurant" });
    }

    restaurant.likes.push(userId);
    await restaurant.save();

    res.status(200).json({ success: true, message: "Restaurant liked successfully" });
});

// @desc    Unlike a restaurant
// @route   PUT /api/:id/unlike
// @access  Public
exports.unlikeRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
        return res.status(404).json({ success: false, error: "Restaurant not found" });
    }

    if (!restaurant.likes.includes(userId)) {
        return res.status(400).json({ success: false, error: "You have not liked this restaurant" });
    }

    restaurant.likes = restaurant.likes.filter(like => like !== userId);
    await restaurant.save();

    res.status(200).json({ success: true, message: "Restaurant unliked successfully" });
});

// @desc    Comment on a restaurant
// @route   PUT /api/:id/comment
// @access  Public
exports.commentRestaurant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
        return res.status(404).json({ success: false, error: "Restaurant not found" });
    }

    restaurant.comments.push({ user: userId, comment });
    await restaurant.save();

    res.status(200).json({ success: true, message: "Comment added successfully" });
});

// @desc    Uncomment a restaurant comment
// @route   PUT /api/:id/uncomment/:commentId
// @access  Public
exports.uncommentRestaurant = asyncHandler(async (req, res) => {
    const { id, commentId } = req.params;

    const userId = req.user.id;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
        return res.status(404).json({ success: false, error: "Restaurant not found" });
    }

    const commentIndex = restaurant.comments.findIndex(comment => comment._id == commentId);
    if (commentIndex === -1) {
        return res.status(404).json({ success: false, error: "Comment not found" });
    }

    if (restaurant.comments[commentIndex].user.toString() !== userId) {
        return res.status(403).json({ success: false, error: "You are not authorized to delete this comment" });
    }

    restaurant.comments.splice(commentIndex, 1);
    await restaurant.save();

    res.status(200).json({ success: true, message: "Comment removed successfully" });
});



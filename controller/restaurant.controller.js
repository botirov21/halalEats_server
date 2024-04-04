const asyncHandler = require("../middleware/async");
const Restaurant = require("../models/restaurant");
const Menu = require("../models/menu");

// @desc    Create data
// @route   PUT /api/addRestaurant
// @access  Public
exports.createNewRestaurant = asyncHandler(async (req, res, next) => {
    const newRestaurant = await Restaurant.create({
        name: req.body.name,
        location: req.body.location,
        contactNumber: req.body.contactNumber,
        restaurantImage: req.body.restaurantImage,
        menuImage: req.body.menuImage,
        hallImage: req.body.hallImage,
        prayerRoom: req.body.prayerRoom,
        workingDays: req.body.workingDays,

    });
    res.status(200).json({
        success: true,
        data: newRestaurant,
    });
});

// @desc    Get all data
// @route   GET /api/restaurants
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
// @route   GET /api/restaurants/:id
// @access  Public
exports.updateRestaurant = asyncHandler(async (req, res) => {
    const restaurantId = await Restaurant.findById(req.params.id)
    if(!restaurantId){
        return res.status(404).json({
            success: false,
            error: "not found"
        })
    }
    const updatedData = {
        name: req.body.name,
        location: req.body.location,
    };
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
      });
    res.status(200).json({
        success: true, 
        data: updatedRestaurant,
    });
});

// @desc    Delete data by id
// @route   GET /api/restaurants/:id
// @access  Public
exports.deleteRestaurant = asyncHandler(async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})

exports.addMenu = asyncHandler(async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { name, price, image } = req.body;

        const menu = await Menu.create({ restaurantId, name, price, image });

        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, { $push: { menu: menu._id } }, { new: true });

        res.status(201).json({ message: 'Menu added successfully', menu, restaurant });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




const asyncHandler = require("../middleware/async");
const Mosque = require("../models/market");

// @desc    Create data
// @route   PUT /api/addMarket
// @access  Public
exports.createNewMosque = asyncHandler(async (req, res, next) => {
    const newMosque = await Mosque.create({
        name: req.body.name,
        location: req.body.location,
    });
    res.status(200).json({
        success: true,
        data: newMosque,
    });
});

// @desc    Get all data
// @route   GET /api/AllMarkets
// @access  Public
exports.getAllMosques = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 10;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await Mosque.countDocuments();
  
    const mosque = await Mosque.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: mosque,    
    });
});

// @desc    Get data by id
// @route   GET /api/:id
// @access  Public
exports.getMosqueById = asyncHandler(async (req, res, next) => {
    const mosqueId = req.params.id;
    const data = await Mosque.findById(mosqueId);

    res.status(200).json(data);
});

// @desc    Update data by id
// @route   GET /api/:id
// @access  Public
exports.updateMosque = asyncHandler(async (req, res) => {
    const mosqueId = await Mosque.findById(req.params.id)
    if(!mosqueId){
        return res.status(404).json({
            success: false,
            error: "not found"
        })
    }
    const updatedData = {
        name: req.body.name,
        location: req.body.location,
    };
    const updatedMosque = await Mosque.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
      });
    res.status(200).json({
        success: true, 
        data: updatedMosque,
    });
});

// @desc    Delete data by id
// @route   GET /api/:id
// @access  Public
exports.deleteMosque = asyncHandler(async (req, res) => {
    await Mosque.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})


// @desc    Like a market
// @route   PUT /api/restaurants/:id/like
// @access  Public
exports.likeMosque = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const mosque = await Mosque.findById(id);
    if (!mosque) {
        return res.status(404).json({ success: false, error: "mosque not found" });
    }

    if (mosque.likes.includes(userId)) {
        return res.status(400).json({ success: false, error: "You have already liked this mosque" });
    }

    mosque.likes.push(userId);
    await mosque.save();

    res.status(200).json({ success: true, message: "mosque liked Market" });
});




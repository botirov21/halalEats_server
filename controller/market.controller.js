const asyncHandler = require("../middleware/async");
const Market = require("../models/market");

// @desc    Create data
// @route   PUT /api/addMarket
// @access  Public
exports.createNewMarket = asyncHandler(async (req, res, next) => {
    const newMarket = await Market.create({
        name: req.body.name,
        location: req.body.location,
        contactNumber: req.body.contactNumber,
        marketImage: req.body.marketImage,
        workingDays: req.body.workingDays,

    });
    res.status(200).json({
        success: true,
        data: newMarket,
    });
});

// @desc    Get all data
// @route   GET /api/AllMarkets
// @access  Public
exports.getAllMarkets = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 10;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await Restaurant.countDocuments();
  
    const market = await Market.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: market,    
    });
});

// @desc    Get data by id
// @route   GET /api/markets/:id
// @access  Public
exports.getMarketById = asyncHandler(async (req, res, next) => {
    const marketId = req.params.id;
    const data = await Market.findById(marketId);

    res.status(200).json(data);
});

// @desc    Update data by id
// @route   GET /api/:id
// @access  Public
exports.updateMarket = asyncHandler(async (req, res) => {
    const marketId = await Market.findById(req.params.id)
    if(!marketId){
        return res.status(404).json({
            success: false,
            error: "not found"
        })
    }
    const updatedData = {
        name: req.body.name,
        location: req.body.location,
    };
    const updatedMarket = await Market.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
        runValidators: true,
      });
    res.status(200).json({
        success: true, 
        data: updatedMarket,
    });
});

// @desc    Delete data by id
// @route   GET /api/:id
// @access  Public
exports.deleteMarket = asyncHandler(async (req, res) => {
    await Market.findByIdAndDelete(req.params.id);
    res.status(200).json("Data deleted succesfully");
})


// @desc    Like a market
// @route   PUT /api/:id/like
// @access  Public
exports.likeMarket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const market = await Market.findById(id);
    if (!market) {
        return res.status(404).json({ success: false, error: "Market not found" });
    }

    if (market.likes.includes(userId)) {
        return res.status(400).json({ success: false, error: "You have already liked this Market" });
    }

    market.likes.push(userId);
    await market.save();

    res.status(200).json({ success: true, message: "Market liked Market" });
});

// @desc    Unlike a Market
// @route   PUT /api/:id/unlike
// @access  Public
exports.unlikeMarket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const market = await Market.findById(id);
    if (!market) {
        return res.status(404).json({ success: false, error: "Market not found" });
    }

    if (!market.likes.includes(userId)) {
        return res.status(400).json({ success: false, error: "You have not liked this Market" });
    }

    market.likes = market.likes.filter(like => like !== userId);
    await market.save();

    res.status(200).json({ success: true, message: "Market unliked successfully" });
});

// @desc    Comment on a market
// @route   PUT /api/:id/comment
// @access  Public
exports.commentMarket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

    const market = await Market.findById(id);
    if (!market) {
        return res.status(404).json({ success: false, error: "Market not found" });
    }

    market.comments.push({ user: userId, comment });
    await market.save();

    res.status(200).json({ success: true, message: "Comment added successfully" });
});

// @desc    Uncomment a market comment
// @route   PUT /api/:id/uncomment/:commentId
// @access  Public
exports.uncommentMarket = asyncHandler(async (req, res) => {
    const { id, commentId } = req.params;

    const userId = req.user.id;
    const market = await Market.findById(id);

    if (!market) {
        return res.status(404).json({ success: false, error: "market not found" });
    }

    const commentIndex = market.comments.findIndex(comment => comment._id == commentId);
    if (commentIndex === -1) {
        return res.status(404).json({ success: false, error: "Comment not found" });
    }

    if (market.comments[commentIndex].user.toString() !== userId) {
        return res.status(403).json({ success: false, error: "You are not authorized to delete this comment" });
    }

    market.comments.splice(commentIndex, 1);
    await market.save();

    res.status(200).json({ success: true, message: "Comment removed successfully" });
});



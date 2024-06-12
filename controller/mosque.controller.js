const asyncHandler = require("../middleware/async");
const Mosque = require("../models/mosque");

// @desc    Create a new mosque
// @route   POST /api/mosques
// @access  Public
exports.createNewMosque = asyncHandler(async (req, res, next) => {
    const newMosque = await Mosque.create(req.body);
    res.status(200).json({
        success: true,
        data: newMosque,
    });
});

// @desc    Get all mosques
// @route   GET /api/mosques
// @access  Public
exports.getAllMosques = asyncHandler(async (req, res, next) => {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 10;

    const limit = parseInt(req.query.limit || pageLimit);
    const page = parseInt(req.query.page || 1);
    const total = await Mosque.countDocuments();
  
    const mosques = await Mosque.find()
      .skip(page * limit - limit)
      .limit(limit);
    res.status(200).json({
        success: true,
        pageCount: Math.ceil(total / limit),
        currentPage: page,
        next: Math.ceil(total / limit) < page + 1 ? null : page + 1,
        data: mosques,    
    });
});

// @desc    Get mosque by ID
// @route   GET /api/mosques/:id
// @access  Public
exports.getMosqueById = asyncHandler(async (req, res, next) => {
    const mosqueId = req.params.id;
    const mosque = await Mosque.findById(mosqueId);
    if (!mosque) {
        return res.status(404).json({
            success: false,
            error: "Mosque not found"
        });
    }
    res.status(200).json({
        success: true,
        data: mosque
    });
});

// @desc    Update mosque by ID
// @route   PUT /api/mosques/:id
// @access  Public
exports.updateMosque = asyncHandler(async (req, res) => {
    const mosqueId = req.params.id;
    const updatedMosque = await Mosque.findByIdAndUpdate(mosqueId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedMosque) {
        return res.status(404).json({
            success: false,
            error: "Mosque not found"
        });
    }
    res.status(200).json({
        success: true,
        data: updatedMosque
    });
});

// @desc    Delete mosque by ID
// @route   DELETE /api/mosques/:id
// @access  Public
exports.deleteMosque = asyncHandler(async (req, res) => {
    const mosqueId = req.params.id;
    const deletedMosque = await Mosque.findByIdAndDelete(mosqueId);
    if (!deletedMosque) {
        return res.status(404).json({
            success: false,
            error: "Mosque not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Mosque deleted successfully"
    });
});

// @desc    Like a mosque
// @route   PUT /api/mosques/:id/like
// @access  Public
exports.likeMosque = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const mosque = await Mosque.findById(id);
    if (!mosque) {
        return res.status(404).json({ success: false, error: "Mosque not found" });
    }

    if (mosque.likes.includes(userId)) {
        return res.status(400).json({ success: false, error: "You have already liked this mosque" });
    }

    mosque.likes.push(userId);
    await mosque.save();

    res.status(200).json({ success: true, message: "Mosque liked" });
});

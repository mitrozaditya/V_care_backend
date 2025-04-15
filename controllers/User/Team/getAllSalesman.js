const User = require('../../../models/Master/userMaster');

// Get all users with the role of 'salesman'
exports.getAllSalesman = async (req, res) => {
  try {
    // Ensure correct query for fetching salesmen
    const salesmen = await User.find({ user_role: 'salesman' });

    if (!salesmen.length) {
      return res.status(404).json({ 
        message: 'No salesmen found', 
        success: false 
      });
    }

    res.status(200).json({ 
      message: 'Salesman fetched successfully', 
      success: true, 
      data: salesmen 
    });
  } catch (error) {
    console.error('Error fetching salesmen:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
};

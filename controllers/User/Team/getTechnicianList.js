const User = require('../../../models/Master/userMaster');

// Get all users with the role of 'salesman'
exports.getTechnicianList = async (req, res) => {
  try {
    // Ensure correct query for fetching salesmen
    const technician = await User.find({ user_role: 'technician' });

    if (!technician.length) {
      return res.status(404).json({ 
        message: 'No technician found', 
        success: false 
      });
    }

    res.status(200).json({ 
      message: 'Salesman fetched successfully', 
      success: true, 
      data: technician 
    });
  } catch (error) {
    console.error('Error fetching salesmen:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
};

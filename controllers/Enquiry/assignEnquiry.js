// const Enquiry = require("../../models/enquiry/enquiry")
// exports.assignEnquiry = async (req, res) => {
// try{
//     const{ id , user_id } = req.body;
//     const enquiry = await Enquiry.findById(id);
//     if(!enquiry){
//         return res.status(404).json({message:"Enquiry not found"});
//     }
//     enquiry.user_id = user_id;
//     await enquiry.save();
//     res.status(200).json({message:"Enquiry assigned successfully"});
// }
// catch(error){
//     console.log(error);
//     res.status(500).json({message:"Server error"});
     

// }
// }



const Enquiry = require("../../models/enquiry/enquiry");

exports.assignEnquiry = async (req, res) => {
  try {
    const { _id, user_id } = req.body;

    // Validate input
    if (!_id || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Both Enquiry ID (_id) and User ID (user_id) are required."
      });
    }

    // Find the enquiry by ID
    const enquiry = await Enquiry.findById(_id);
    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found with the provided ID."
      });
    }

    // Assign the enquiry to the user
    enquiry.user_id = user_id;
    await enquiry.save();

    return res.status(200).json({
      success: true,
      message: "Enquiry assigned successfully.",
      data: enquiry
    });
  } catch (error) {
    console.error("Error in assignEnquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};


const User = require("../../models/User");
const Course = require("../../models/Course");
// Add new user //
const addNewUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      res.status(201).json({
        success: true,
        message: "User added successfully",
        data: savedUser,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while adding the user!",
    });
  }
};
// Get all user //
const getAllUsers = async (req, res) => {
    try {
      const usersList = await User.find({});
  
      if (!usersList || usersList.length === 0) {
        return res.status(200).json({
          success: true,
          data: [],
          message: "No users found!",
        });
      }
  
      const usersWithCourseInfo = await Promise.all(
        usersList.map(async (user) => {
          if (user.role === "instructor") {
            const createdCoursesCount = await Course.countDocuments({
              instructorId: user._id.toString(),
            });
            return {
              ...user.toObject(),
              courseCount: createdCoursesCount, 
            };
          } else {
            const enrolledCoursesCount = await Course.countDocuments({
              "students.studentId": user._id.toString(),
            });
            return {
              ...user.toObject(),
              courseCount: enrolledCoursesCount, 
            };
          }
        })
      );
      console.log(usersWithCourseInfo);
      
      res.status(200).json({
        success: true,
        data: usersWithCourseInfo,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        success: false,
        message: "Some error occurred while fetching users!",
      });
    }
  };

  // Find users //
const getUserDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching user details!",
    });
  }
};

// Update users //
const updateUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating user!",
    });
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserDetailsByID,
  updateUserByID,
};

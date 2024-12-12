const User = require("../../models/User");
const Course = require("../../models/Course");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Add new user //
const addNewUser = async (req, res) => {
  try {
    // const userData = req.body;
    const { userName, userEmail, password, role } = req.body;

    const existingUser = await User.findOne({
      $or: [{ userEmail }, { userName }],
    });
  
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User name or user email already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      userEmail,
      role,
      password: hashPassword,
    });
    
    
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


const deleteUserByID = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.role === "instructor") {
      const createdCoursesCount = await Course.countDocuments({
        instructorId: id,
      });

      if (createdCoursesCount > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot delete instructor with active courses. Please reassign or delete courses first!",
        });
      }
    }

    if (user.role === "user") {
      const enrolledCoursesCount = await Course.countDocuments({
        "students.studentId": id,
      });

      if (enrolledCoursesCount > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot delete user with active course enrollments. Please remove enrollments first!",
        });
      }
    }

    const deletedUser = await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: deletedUser,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while deleting user!",
    });
  }
};

module.exports = {
  addNewUser,
  getAllUsers,
  getUserDetailsByID,
  updateUserByID,
  deleteUserByID
};

const Course = require("../../../models/Course");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: saveCourse,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllCourses = async (req, res) => {
    try {
        const coursesList = await Course.find({});
    
        if (!coursesList || coursesList.length === 0) {
        return res.status(200).json({
            success: true,
            data: [],
            message: "Request course list fail for admin",
        });
        }
    
        res.status(200).json({
        success: true,
        data: coursesList,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
        success: false,
        message: "Some error occurred!",
        });
    }
};


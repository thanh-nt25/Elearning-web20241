const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentViewCourses = async (req, res) => {
  console.log("getAllStudentViewCourses: ", req.query);
  
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
      search = "", 
    } = req.query;

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    if (search) {
      filters.title = { $regex: search, $options: "i" };
    }

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;
        break;
      case "price-hightolow":
        sortParam.pricing = -1;
        break;
      case "title-atoz":
        sortParam.title = 1;
        break;
      case "title-ztoa":
        sortParam.title = -1;
        break;
      default:
        sortParam.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParam);

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
const getStudentViewCourseDetails = async (req, res) => {
  console.log("getStudentViewCourseDetails: ", req.query);
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const checkCoursePurchaseInfo = async (req, res) => {
  console.log("checkCoursePurchaseInfo: ", req.query);
  try {
    const { id, studentId } = req.params;
    const studentCourses = await StudentCourses.findOne({ // dang return null
      userId: studentId,
    });
    console.log(StudentCourses);
    
    if (!studentCourses) {
      return res.status(200).json({
        success: true,
        data: false, 
      });
    }
    
    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseId === id) > -1;
    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
};

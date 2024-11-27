require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const mediaRoutesAdmin = require("./routes/admin-routes/media-routes");
const adminCourseRoutes = require("./routes/admin-routes/course-routes");
const adminUserRoutes = require("./routes/admin-routes/user-routes");
const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
const studentViewOrderRoutes = require("./routes/student-routes/order-routes");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/auth", authRoutes);
app.use("/media", mediaRoutes); // chua co media admin
app.use("/instructor/course", instructorCourseRoutes);
app.use("/admin/course", adminCourseRoutes);
app.use("/admin/user", adminUserRoutes);
app.use("/student/course", studentViewCourseRoutes);
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses-bought", studentCoursesRoutes);
app.use("/student/course-progress", studentCourseProgressRoutes);


app.use((err, req, res, next) => {
console.log(err.stack);
res.status(500).json({
    success: false,
    message: "Something went wrong",
});
});

app.listen(PORT, () => {
console.log(`Server is now running on port ${PORT}`);
});



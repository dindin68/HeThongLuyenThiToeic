const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./app/routes/auth.routes");
const questionRoutes = require("./app/routes/question.routes");
const learningRoutes = require("./app/routes/learning.routes");

const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json()); // Để đọc được dữ liệu JSON từ req.body

// 2. Kết nối MongoDB (Thay bằng link của con hoặc để mặc định chạy máy local)
const MONGO_URI = "mongodb://localhost:27017/toeic_db";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB đã kết nối!"))
  .catch((err) => console.error("Lỗi kết nối DB:", err));

// 3. Định tuyến (Routes)
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/learning", learningRoutes);

app.get("/", (req, res) => {
  res.send("Server TOEIC đang chạy vèo vèo...");
});

// 4. Khởi chạy Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});

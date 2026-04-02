const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  // Kiểm tra xem header Authorization có tồn tại và bắt đầu bằng dạng "Bearer <token>" không
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1]; // Lấy token từ header
      const decoded = jwt.verify(token, "toeic_secret"); // Giải mã token để lấy thông tin người dùng
      req.user = await User.findById(decoded.id).select("-password"); // Lưu thông tin người dùng vào req.user, loại bỏ trường password
      next(); // Chuyển sang middleware tiếp theo
    } catch (error) {
      res
        .status(401)
        .json({ message: "Không hợp lệ, vui lòng đăng nhập lại!" });
    }

  if (!token) {
    res.status(401).json({ message: "Không có token, vui lòng đăng nhập!" });
  }
};
module.exports = { protect };

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Hàm tạo Token
const generateToken = (id) => {
  return jwt.sign({ id }, "toeic_secret", { expiresIn: "30d" });
};

exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email này đã được sử dụng!" });
    }

    // Tạo user mới
    const user = await User.create({ userName, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id), // Gửi kèm token để đăng nhập luôn
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

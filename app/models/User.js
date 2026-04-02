const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Vui lòng nhập tên người dùng!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email!"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Vui lòng nhập email hợp lệ!",
      ],
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu!"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự!"],
    },
    role: {
      type: String,
      enum: ["learner", "admin"],
      default: "learner",
    },
    streakCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

//Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Phương thức để so sánh mật khẩu đã nhập với mật khẩu đã lưu trong cơ sở dữ liệu
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

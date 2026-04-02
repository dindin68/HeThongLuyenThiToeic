const Question = require("../models/Question");
const QuestionGroup = require("../models/QuestionGroup");

// 1. LẤY CÂU HỎI THEO PART (Dùng Populate để lôi thông tin Group ra)
exports.getQuestionsByPart = async (req, res) => {
  try {
    const { part } = req.params;

    // Tìm tất cả các Group thuộc Part này trước
    const groups = await QuestionGroup.find({ part: part });
    const groupIds = groups.map((g) => g._id);

    // Sau đó tìm tất cả câu hỏi thuộc các Group đó
    const questions = await Question.find({
      questionGroupId: { $in: groupIds },
    }).populate("questionGroupId"); // Lấy luôn thông tin đoạn văn/hình ảnh/audio

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy câu hỏi: " + error.message });
  }
};

// 2. THÊM NHÓM CÂU HỎI (Admin tạo Group trước)
exports.createQuestionGroup = async (req, res) => {
  try {
    const group = await QuestionGroup.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo nhóm câu hỏi: " + error.message });
  }
};

// 3. THÊM CÂU HỎI LẺ (Admin nạp câu hỏi vào Group đã có)
exports.createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo câu hỏi lẻ: " + error.message });
  }
};

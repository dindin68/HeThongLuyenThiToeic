const mongoose = require("mongoose");
const { LearningContent } = require("./LearningContent");

const questionSchema = new mongoose.Schema(
  {
    questionGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionGroup",
      required: [true, "Vui lòng cho biết câu hỏi thuộc nhóm câu hỏi nào!"],
    },
    questionText: {
      type: String,
      required: [true, "Vui lòng nhập nội dung câu hỏi"],
    },
    optionA: {
      type: String,
      required: [true, "Vui lòng nhập đáp án A"],
      trim: true,
    },
    optionB: {
      type: String,
      required: [true, "Vui lòng nhập đáp án B"],
      trim: true,
    },
    optionC: {
      type: String,
      required: [true, "Vui lòng nhập đáp án C"],
      trim: true,
    },
    optionD: {
      type: String,
      required: [true, "Vui lòng nhập đáp án D"],
      trim: true,
    },
    correctOption: {
      type: String,
      required: [true, "Vui lòng chọn đáp án đúng"],
      trim: true,
      enum: ["A", "B", "C", "D"],
    },
    explanation: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      required: [
        true,
        "Vui lòng cho biết thứ tự của câu hỏi trong nhóm câu hỏi!",
      ],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Question", questionSchema);

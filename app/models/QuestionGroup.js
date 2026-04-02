const mongoose = require("mongoose");
const questionGroupSchema = new mongoose.Schema(
  {
    learningContentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningContent",
      required: [
        true,
        "Vui lòng cho biết nhóm câu hỏi thuộc nội dung học tập nào!",
      ],
    },
    passage: {
      type: String,
      required: [true, "Vui lòng nhập đoạn văn cho nhóm câu hỏi này!"],
      trim: true,
    },
    audioUrl: { type: String, trim: true },
    imgUrl: { type: String, trim: true },
    skill: {
      type: String,
      required: [true, "Vui lòng chọn kỹ năng cho nhóm câu hỏi này!"],
      trim: true,
      enum: ["Reading", "Listening"],
    },
    part: {
      type: Number,
      required: [true, "Vui lòng cho biết nhóm câu hỏi thuộc part nào!"],
      enum: [1, 2, 3, 4, 5, 6, 7],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("QuestionGroup", questionGroupSchema);

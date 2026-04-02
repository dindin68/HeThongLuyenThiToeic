const mongoose = require("mongoose");

const historyStudySchema = new mongooose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Lịch sử học tập phải thuộc về một người dùng!"],
    },
    learningContentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningContent",
      required: [
        true,
        "Lịch sử học tập phải liên quan đến một nội dung học tập!",
      ],
    },
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number,
      required: true,
    },
    details: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedOption: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["completed", "in-progress"],
      default: "in-progress",
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("HistoryStudy", historyStudySchema);

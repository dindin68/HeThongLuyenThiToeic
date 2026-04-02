const mongoose = require("mongoose");

// Cau hinh chung cho cac loai noi dung hoc tap
const baseOptions = {
  discriminatorKey: "contentType",
  collection: "learningContents",
  timestamps: true,
};

// Model cha
const learningContentSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: [true, "Vui lòng nhập tên chủ đề"],
      trim: true,
    },
  },
  baseOptions,
);

const LearningContent = mongoose.model(
  "LearningContent",
  learningContentSchema,
);

// Cac model ke thua
const Vocabulary = LearningContent.discriminator(
  "Vocabulary",
  new mongoose.Schema({
    word: {
      type: String,
      required: [true, "Vui lòng nhập từ vựng"],
      trim: true,
    },
    wordType: {
      type: String,
      enum: [
        "Noun",
        "Verb",
        "Adjective",
        "Adverb",
        "Phrasal Verb",
        "Preposition",
      ],
      default: "Noun",
    },
    meaning: {
      type: String,
      required: [true, "Vui lòng nhập nghĩa của từ"],
      trim: true,
    },
    pronunciation: { type: String, trim: true },
    example: { type: String, trim: true },
    exampleMeaning: { type: String, trim: true },
    audioVocabUrl: { type: String, trim: true },
    imgVocabUrl: { type: String, trim: true },
  }),
);

const Grammar = LearningContent.discriminator(
  "Grammar",
  new mongoose.Schema({
    rule: {
      type: String,
      required: [true, "Vui lòng nhập quy tắc ngữ pháp"],
      trim: true,
    },
    example: { type: String, trim: true },
    note: { type: String, trim: true },
  }),
);

const Assessment = LearningContent.discriminator(
  "Assessment",
  new mongoose.Schema({
    typeTest: {
      type: String,
      required: [true, "Vui lòng nhập loại bài kiểm tra"],
      trim: true,
      enum: ["Test", "Practice"],
    },
    subType: {
      type: String,
      enum: ["FULL", "MINI", "VOCAB", "GRAMMAR"],
      required: true,
    },
    duration: {
      type: Number,
      required: [true, "Vui lòng nhập thời gian làm bài (phút)"],
    },
    numQuestions: {
      type: Number,
      default: 0,
    },
  }),
);
module.exports = { LearningContent, Vocabulary, Grammar, Assessment };

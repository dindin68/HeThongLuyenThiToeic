const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.controller");
const { protect } = require("../utils/authMiddleware");

// --- ROUTES CHO NHÓM CÂU HỎI (GROUP) ---

// Cách 1: URL sẽ là /api/questions/group/add (Gọn hơn)
router.post("/group/add", protect, questionController.createQuestionGroup);

// --- ROUTES CHO CÂU HỎI LẺ (QUESTION) ---

// URL: /api/questions/add
router.post("/add", protect, questionController.createQuestion);

// --- ROUTES LẤY DỮ LIỆU ---

// URL: /api/questions/part/5
router.get("/part/:part", protect, questionController.getQuestionsByPart);

module.exports = router;

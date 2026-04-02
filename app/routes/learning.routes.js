const express = require("express");
const router = express.Router();
const learningController = require("../controllers/learning.controller");
const { protect } = require("../utils/authMiddleware");

router.post("/vocab/add", protect, learningController.createVocabulary);
router.get("/vocab/:topic", learningController.getVocabByTopic);

module.exports = router;

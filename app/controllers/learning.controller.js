const { Vocabulary } = require("../models/LearningContent");
exports.createVocabulary = async (req, res) => {
  try {
    // Ép kiểu contentType là Vocabulary để nó vào đúng discriminator
    const vocabData = { ...req.body, contentType: "Vocabulary" };
    const word = await Vocabulary.create(vocabData);
    res.status(201).json(word);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm từ vựng: " + error.message });
  }
};

exports.getVocabByTopic = async (req, res) => {
  try {
    const { topic } = req.params;

    const words = await Vocabulary.find({ topicName: topic });

    if (words.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy từ vựng cho chủ đề này" });
    }
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

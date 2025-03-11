const express = require("express");
const {
  getAllManhwa,
  getManhwaById,
  addManhwa,
  updateManhwa,
  deleteManhwa,
} = require("../controllers/manhwaController");

const router = express.Router();

router.get("/", getAllManhwa); // Bisa GET dengan query parameter
router.get("/:id", getManhwaById); // GET berdasarkan ID
router.post("/", addManhwa);
router.put("/:id", updateManhwa);
router.delete("/", deleteManhwa); // Bisa DELETE dengan query parameter

module.exports = router;

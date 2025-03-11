const fs = require("fs");
const filePath = "./data/manhwaData.json";

// Fungsi untuk membaca data dari file JSON
const loadData = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Fungsi untuk menyimpan data ke file JSON
const saveData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = { loadData, saveData };

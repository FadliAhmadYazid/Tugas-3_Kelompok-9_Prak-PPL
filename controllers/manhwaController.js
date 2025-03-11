const { loadData, saveData } = require("../models/manhwaModel");

// Fungsi filter berdasarkan query parameter
const filterManhwa = (manhwaData, query) => {
  return manhwaData.filter((m) => {
    return Object.keys(query).every((key) => {
      if (key === "rating") return m[key] === parseFloat(query[key]);
      return m[key]?.toString().toLowerCase().includes(query[key].toLowerCase());
    });
  });
};

// GET Semua Manhwa (mendukung filter query)
exports.getAllManhwa = (req, res) => {
  const manhwaData = loadData();
  const filteredData = filterManhwa(manhwaData, req.query);
  res.json({ data: filteredData });
};

// GET Manhwa by ID
exports.getManhwaById = (req, res) => {
  const { id } = req.params;
  const manhwaData = loadData();
  const manhwa = manhwaData.find((m) => m.id === parseInt(id));
  if (!manhwa) return res.status(404).json({ message: "Manhwa tidak ditemukan" });
  res.json(manhwa);
};

// POST Tambah Manhwa
exports.addManhwa = (req, res) => {
  const { title, author, genre, status, rating } = req.body;
  const manhwaData = loadData();

  const newManhwa = {
    id: manhwaData.length + 1,
    title,
    author,
    genre,
    status,
    rating: parseFloat(rating),
  };

  manhwaData.push(newManhwa);
  saveData(manhwaData);
  res.status(201).json(newManhwa);
};

// PUT Update Manhwa by ID
exports.updateManhwa = (req, res) => {
  const { id } = req.params;
  let manhwaData = loadData();
  const index = manhwaData.findIndex((m) => m.id === parseInt(id));

  if (index === -1) return res.status(404).json({ message: "Manhwa tidak ditemukan" });

  // Update hanya field yang dikirim
  manhwaData[index] = {
    ...manhwaData[index],
    ...req.body,
  };

  saveData(manhwaData);
  res.json(manhwaData[index]);
};

// DELETE Manhwa berdasarkan query parameter (bisa ID, title, author, genre, status, rating)
exports.deleteManhwa = (req, res) => {
  let manhwaData = loadData();
  const filteredData = filterManhwa(manhwaData, req.query);

  if (filteredData.length === 0) return res.status(404).json({ message: "Manhwa tidak ditemukan" });

  // Hapus data yang cocok
  manhwaData = manhwaData.filter((m) => !filteredData.includes(m));

  // Perbarui ID agar tetap berurutan
  manhwaData = manhwaData.map((m, i) => ({ ...m, id: i + 1 }));

  saveData(manhwaData);
  res.json({ message: "Manhwa berhasil dihapus", data: manhwaData });
};

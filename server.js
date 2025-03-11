const express = require("express");
const manhwaRoutes = require("./routes/manhwaRoutes");
const fs = require("fs");

// Pastikan file JSON ada saat server pertama kali dijalankan
const filePath = "./data/manhwaData.json";
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
}

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/manhwa", manhwaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Manhwa API! Use /manhwa to get data.");
});

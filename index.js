const express = require("express");
const server = require("./src/server");

const app = express();
const port = 3000;

app.get("/og-image", async (req, res) => {
  server(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

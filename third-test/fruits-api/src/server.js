const express = require("express");
const fruitsRouter = require("./routes/fruits");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/fruits", fruitsRouter);

app.listen(PORT, () => {
  console.log(`Fruits api listening on port ${PORT}`);
});

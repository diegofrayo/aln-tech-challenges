const express = require("express");
const vendorsRouter = require("./routes/vendors");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/vendors", vendorsRouter);

app.listen(PORT, () => {
  console.log(`Vendors api listening on port ${PORT}`);
});

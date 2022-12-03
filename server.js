const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((connection) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Connection Error", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running - " + port);
});

const express = require("express");
const app = express();
// const { run } = require("./routes/controllers/FbController");
//const { reducer1 } = require("./routes/reducer/ArrayReducer");
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require("./routes/FbRoutes"));
app.listen(port, () => {
  console.log("this is running on server", port);
});

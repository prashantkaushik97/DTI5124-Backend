const express = require("express");
const env = require("dotenv");
const app = express();

//const userRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/auth.js");
const categoryRoutes = require("./src/routes/category.js");
const cartRoutes = require("./src/routes/cart.js");
const productRoutes = require("./src/routes/products.js");
//env variable
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://prashant:dti5124@ecom-cluster.zn7muor.mongodb.net/test`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(process.env.MONGO_DB_PASSWORD);
  });
env.config();
app.use(express.json());
app.use("/api", adminRoutes);

app.use("/api/admin", adminRoutes);
//mongodb+srv://admin:<password>@cluster0.rc30p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://root:<password>@cluster0.f3j6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "hello",
  });
});
app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: req.body,
  });
});
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port number: ", process.env.PORT);
});

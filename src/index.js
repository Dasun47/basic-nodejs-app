//-----Third-party libraries and modules---------------

const express = require("express");

require("dotenv/config");
//- Custom libraries and modules--------
const Configs = require("./configs");
const { ConnectDatabase } = require("./api/v1/helpers");
const { UserRoutes } = require("./api/v1/routes");
//-- Global instances----
const app = express();
const PORT = Configs.DEV_PORT || 3308;

//-------Common middleware-----------
//Accept json
app.use(express.json());

//Base route
app.get("/", (req, res) => {
  res.status(200).json({ success: { massage: `Welcome to the server !` } });
});

//www.google.com/api/users
app.use("/api/users", UserRoutes);

//Error route
app.use((req, res) => {
  res.status(404).json({ success: { massage: `Not Found` } });
});

//----------Initialize the connection------------
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  ConnectDatabase()
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log(err));
});

const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

// Route
const tourRoute = require("./routes/v1/tour.route")


app.get("/", (req, res) => res.send('YAY route is working!'))

// tour route
app.use("/api/v1/", tourRoute);

module.exports = app;
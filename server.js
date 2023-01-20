const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = require("./app");

// database connection 
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log("Database connection established");
})

//server port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})
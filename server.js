// Import dependencies
const express = require("express");
require("dotenv").config();

// PORT
port = process.env.PORT

// Create sesrver
const app = express();
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
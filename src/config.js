const mongoose = require('mongoose');

// Correct MongoDB connection URL
mongoose.connect("mongodb://localhost:27017/logesh")
    .then(() => {
        console.log("Connected successfully");
    })
    .catch((err) => {
        console.log("Error occurred:", err);
    });

// Define the schema
const loginformSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a model
const User = mongoose.model("users", loginformSchema);

// Export the model
module.exports = User;

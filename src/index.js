const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const port = 4000;
const collection =require('./config');
const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})

// request signup 
// request signup 
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        };

        // Check if the user already exists
        const exists = await User.findOne({ name: data.name });
        if (exists) {
            return res.end("User already exists");
        } else {
            // Hash the password
            const salt = 12; // Increase salt rounds for better security
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;

            // Insert the new user into the database
            const newUser = new User(data);
            await newUser.save();
            console.log("User data inserted");

            // Send a success response
            res.end("Signup successful");
        }
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Error occurred during signup", error: error.message });
    }
});


app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if (!check) {
            return res.status(404).send("Username not found");
        }

        const isPassword = await bcrypt.compare(req.body.password, check.password);
        if (isPassword) {
            res.render("home");
        } else {
            res.status(401).send("Wrong password");
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Wrong details", error: error.message });
    }
});


    

app.listen(port,()=>{
    console.log("server is running");
})

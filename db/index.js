// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGODB_URI = "mongodb+srv://chrisjcastle:dougal22@cluster0.7b5yb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connection to the database "recipe-app"
mongoose.connect("mongodb+srv://chrisjcastle:dougal22@cluster0.7b5yb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

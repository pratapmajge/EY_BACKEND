const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://gofood:pratap123@database1.ez26n.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=database1"
    );
    // i always keep my mongo url inside .env but only for cleaar understanding i've not done here the same
    console.log("Connected to MongoDB successfully!");

    const fetched_data = mongoose.connection.db.collection("food_items");

    const data = await fetched_data.find({}).toArray(); 
    console.log();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = mongoDB;

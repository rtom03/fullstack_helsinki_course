// const mongoose = require("mongoose");
import mongoose from "mongoose";
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://rtom:${password}@atlascluster.yialfbi.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phoneBookSchema);

const getContacts = await Phonebook.find({}).then((contact) => {
  contact.forEach((ct) => console.log(ct));
});

if (process.argv === 2) {
  getContacts();
  mongoose.connection.close();
} else {
  const phone = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
  });
  phone.save().then((result) => {
    console.log(`added ${result.name} ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

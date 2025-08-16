import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.set("strictQuery", false);

dotenv.config();

const url = process.env.MONGODB_URI;
// console.log(url);

mongoose
  .connect(url)
  .then((result) => console.log(`Database connection established`))
  .catch((error) =>
    console.error("An error occured while connecting to database", error)
  );

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(\d{2}-\d{7}|\d{3}-\d{8})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Person = mongoose.model("Person", personSchema);

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, minLength: 3 },
  username: { type: String, unique: true },
  password: { type: String },
  blogs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", userSchema);

export { User };

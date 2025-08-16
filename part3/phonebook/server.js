import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { Person } from "./model/Phonebook.js";
import { errorHandler } from "./middleware/errorHandler.js";
// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
const app = express();
const options = ":method :url :status :response-time ms - :res[content-length]";
const PORT = process.env.PORT || 8001;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
// app.use(cors());
// app.use(
//   morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       tokens["response-time"](req, res),
//       "ms",
//     ].join(" ");
//   }, options)
// );

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  return Person.find({}).then((person) => res.json(person));
});

app.get("/api/persons/info", (req, res) => {
  const now = new Date();
  Person.find({}).then((persons) => {
    // console.log(person);
    res.json({
      data: `Phonebook has ${persons.length} entries`,
      year: now.getFullYear(),
      month: now.getMonth() + 1, // Months are 0-based in JS
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      formatted: now.toLocaleString(), // nice readable format
    });
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then((person) => res.json(person));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id).then((person) => res.json(person));
});

const getRandom = () => {
  const ids =
    persons.length > 0
      ? Math.random(...persons.map((person) => Number(person.id)))
      : 0;
  return ids;
};
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({ message: "Name and number are required" });
  }

  Person.find({}).then((person) => {
    const existedName = person.find((ps) => ps.name === name);
    if (existedName) {
      Person.findByIdAndUpdate(
        existedName._id,
        { number: number },
        { new: true }
      )
        .then((updatedPerson) => res.json(updatedPerson))
        .catch((error) => res.status(400).json({ error: error }));
    } else {
      const newObj = new Person({ name, number });
      newObj
        .save()
        .then((person) => res.json(person))
        .catch((error) => res.status(400).json(error));
    }
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON http://localhost:${PORT}`);
});

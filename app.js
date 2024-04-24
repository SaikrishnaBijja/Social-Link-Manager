import express from "express";
import ejs from "ejs";

import { addEntry, getUser, linkInfo, validateUser } from "./database.js";

const app = new express();
var currentid = 0;
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const user = await validateUser(id, password);
  if (user) {
    currentid = id;
    res.redirect("/profile");
  } else {
    res.send("Incorrect Password");
  }
});

app.get("/profile", async (req, res) => {
  const data = await getUser(currentid);
  const data2 = await linkInfo(currentid);
  res.render("profile", { data: data, data2: data2 });
});

app.get("/register", async (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const body = req.body;
  await addEntry(body);
  console.log(body);
});
app.listen(3000, () => {
  console.log("App Running On 3000");
});

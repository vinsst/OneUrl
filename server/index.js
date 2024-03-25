const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Review = require("./models/review");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;

const dir_rootApp = path.dirname(__dirname);

app.use(
  cors({
    credentials: true,
    origin: process.env.client_URL,
  })
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

const URLMongoDB = process.env.URLMongoDB;

mongoose
  .connect(URLMongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error: ${err}`));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

function printDirectoryStructure(directoryPath, indent = "") {
  const items = fs.readdirSync(directoryPath);
  items.forEach((item) => {
    const itemPath = path.join(directoryPath, item);
    if (item === "node_modules" || item === ".git") {
      return;
    }
    const stats = fs.statSync(itemPath);
    if (items.length > 15) {
      console.log(indent + "📁 " + item);
      return;
    }
    if (item === "build" || item === "assets") {
      console.log(indent + "📁 " + item);
      return;
    }
    if (stats.isDirectory()) {
      console.log(indent + "📁 " + item);
      printDirectoryStructure(itemPath, indent + "  ");
    } else {
      console.log(indent + "📄 " + item);
    }
  });
}

const projectRootPath = dir_rootApp;

console.log("📁 Project Structure:");
printDirectoryStructure(projectRootPath);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(dir_rootApp, "/client/build")));

console.log(path.join(dir_rootApp, "/client/build"));
console.log(__dirname);

app.listen(port, () => {
  console.log("Listening, port " + port);
});

app.use(express.json());

// Routes

app.get("/user", (req, res) => {
  res.json(req.user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(process.env.client_URL);
  }
);

app.post("/api/save-input-review", (req, res) => {
  const review = new Review(req.body);

  review
    .save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error saving review:", error);
      res.status(500).json({ error: "Failed to save review" });
    });
});

app.put("/reviews/:id/report", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { inputValueReport } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { inputValueReport: inputValueReport },
      { new: true }
    );

    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/reviews/:id/like", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { liked } = req.body;
    const incrementValue = liked ? 1 : -1;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { like: incrementValue } },
      { new: true }
    );

    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/get-all-reviews", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((error) => {
      console.error("Error getting reviews:", error);
      res.sendStatus(500);
    });
});

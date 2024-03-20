const express = require("express");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3001;

const dir_rootApp = path.dirname(__dirname);

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

console.log(path.join(dir_rootApp, "/clientGoogleReview/build"));
console.log(__dirname);

app.listen(port, () => {
  console.log("Listening, port " + port);
});

app.use(express.json());

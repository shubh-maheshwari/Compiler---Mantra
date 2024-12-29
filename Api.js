const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

app.use(bodyP.json());
app.use(
  "/codemirror-5.65.18",
  express.static("C:/Users/91730/Desktop/COMPILER/codemirror-5.65.18")
);

// Hosting index.html file using the created API
app.get("/", function (req, res) {
  res.sendFile("C:/Users/91730/Desktop/COMPILER/index.html");
});

// Compile endpoint
app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;

  try {
    if (lang ==="Cpp") {
      if (!input) {
        var envData = { OS: "windows", cmd: "g++", options:{timeout:10000} }; // Uses g++ command to compile
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows", cmd: "g++", options:{timeout:10000} }; // Uses g++ command to compile
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang ==="Java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else if (lang === "Python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    } else {
      res.send({ output: "Unsupported language" });
    }
  } catch (e) {
    console.log("Error: ", e);
    res.send({ output: "error" });
  }
});

app.listen(8000, function () {
  console.log("Server is running on port 8000");
});

const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.set("/", (req, res) => {
  res.render("index.html");
});

//podemos utilizar um banco como mongoDb por exemplo
let messages = [];

io.on("connection", (socket) => {
  console.log(`Socket is runnig: ${socket.id}`);

  socket.on("sendMessage", (data) => {
    console.log(data);
    messages.push(data);
  });
});

server.listen(3000);

const express = require("express");
const router = express.Router();
const path = require("path");
const { addUser, chkUser, chkLogin } = require("../util/user");

const checkAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.redirect("/");
};

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

router.get("/registrar", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/pages/register.html"));
});

router.get("/chat", checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/pages/chat.html"));
});

router.post("/register", (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).send("Digie nome e senha");
  }

  if (chkUser(nome)) {
    return res.status(400).send("Usúario já existe");
  }

  addUser(nome.toLowerCase().trim(), senha);
  req.session.user = { nome };
  return res.redirect("/chat");
});

router.post("/login", (req, res) => {
  const { nome, senha } = req.body;

  if (chkLogin(nome, senha)) {
    req.session.user = { nome };
    return res.redirect("/chat");
  }

  return res.redirect("/");
});

module.exports = router;

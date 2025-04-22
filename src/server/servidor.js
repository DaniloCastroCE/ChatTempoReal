const { Server } = require("socket.io");

const servidor = (server, sessionMiddleware) => {
  const io = new Server(server, {
    pingInterval: 25000,
    pingTimeout: 60000,
  });

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });

  io.on("connection", (socket) => {
    const username = socket.request.session.user
      ? socket.request.session.user.nome
      : "Desconhecido";
    socket.username = username;
    console.log(
      `Clliente ${socket.username} com ID ${socket.id} se CONECTOU no servidor`
    );

    socket.on("disconnect", (reason) => {
      console.log(
        `Cliente com ID ${socket.id} se DESCONECTOU do servidor\nMotivo: ${reason}`
      );

      socket.request.session.destroy((err) => {
        if (err) {
          console.error("Erro ao destruir a sessão:", err);
        } else {
          console.log(`Sessão destruída para o usuário ${socket.username}`);
        }
      });
      socket.username = null;
    });
  });
};

module.exports = servidor;

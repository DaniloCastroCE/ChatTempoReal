const users = [
  { nome: "danilo", senha: "123", create_date: new Date().toISOString() },
];

const addUser = (nome, senha) => {
  const user = {
    nome,
    senha,
    create_date: new Date().toISOString(),
  };
  users.push(user);
  return user;
};

const chkUser = (nome) => {
  return users.some(
    (user) => user.nome.toLowerCase().trim() === nome.toLowerCase().trim()
  );
};

const chkLogin = (nome, senha) => {
  return users.some(
    (user) =>
      user.nome.toLowerCase().trim() === nome.toLowerCase().trim() &&
      user.senha === senha
  );
};

module.exports = { users, addUser, chkUser, chkLogin };

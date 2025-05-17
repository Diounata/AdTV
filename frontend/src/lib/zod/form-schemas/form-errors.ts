export const formErrors = {
  required: "Este campo é obrigatório",
  cpf: {
    invalid: "CPF inválido",
  },
  email: {
    invalid: "E-mail inválido",
    doesNotMatch: "E-mails não coincidem",
  },
  image: {
    exceededFileSize: (maxFileSize: number) =>
      `Tamanho máximo de arquivo excedido (${maxFileSize} mb)`,
    invalidFileType:
      "Formato de arquivo inválido. Por favor, envie um arquivo .jpg, .jpeg ou .png",
  },
  password: {
    min: "Senha deve ter no mínimo 6 caracteres",
    max: "Senha deve ter no máximo 32 caracteres",
    doesNotMatch: "Senhas não coincidem",
  },
  phone: {
    invalid: "Telefone inválido",
  },
  postalCode: {
    invalid: "CEP inválido",
  },
};

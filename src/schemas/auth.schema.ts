import * as yup from "yup";

const passwordRules = yup
  .string()
  .required("Senha é obrigatória")
  .min(8, "A a senhra deve conter minimo de 8 caracteres")
  .test(
    "has-uppercase",
    "Deve conter pelo menos uma letra maiúscula",
    (value) => /[A-Z]/.test(value || "")
  )
  .test(
    "has-lowercase",
    "Deve conter pelo menos uma letra minúscula",
    (value) => /[a-z]/.test(value || "")
  )
  .test("has-number", "Deve conter pelo menos um número", (value) =>
    /[0-9]/.test(value || "")
  );

export const registerSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Email é inválido").required("Email é obrigatório"),
  password: passwordRules,
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatório")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

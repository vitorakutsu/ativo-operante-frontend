import { axiosApi } from "@/api/axios-base";

export const createUsuario = async (data) => {
  try {
    const response = await axiosApi.post("/usuario/create", {
      cpf: data.cpf,
      email: data.email,
      senha: data.senha,
      nivel: Number(data.nivel),
    });

    if (response.status === 201) {
      return response;
    } else {
      throw new Error("Erro : " + response.statusText);
    }
  } catch (e) {
    console.log(e);
  }
};

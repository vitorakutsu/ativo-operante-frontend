import { axiosApi } from "@/api/axios-base";

export const createOrgao = async (nome) => {
  try {
    const response = await axiosApi.post("/orgao", {
      nome,
    });

    if (response.status === 201) {
      return response;
    } else {
      throw new Error("Erro ao criar orgão");
    }
  } catch (error) {
    return error.response.data;
  }
};

export const updateOrgao = async (id, nome) => {
  try {
    const response = await axiosApi.put("/orgao", {
      id,
      nome,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro ao atualizar orgão");
    }
  } catch (error) {
    return error.response.data;
  }
};

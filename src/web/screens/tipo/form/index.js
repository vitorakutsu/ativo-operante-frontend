import { axiosApi } from "@/api/axios-base";

export const createType = async (nome) => {
  try {
    const response = await axiosApi.post("/tipo", {
      nome,
    });

    if (response.status === 201) {
      return response;
    } else {
      throw new Error("Erro ao criar tipo");
    }
  } catch (error) {
    return error.response.data;
  }
};

export const updateType = async (id, nome) => {
  try {
    const response = await axiosApi.put("/tipo", {
      id,
      nome,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro ao criar tipo");
    }
  } catch (error) {
    return error.response.data;
  }
};

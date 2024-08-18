import { axiosApi } from "@/api/axios-base";

export const getAllUsuario = async () => {
  try {
    const response = await axiosApi.get("/usuario/all");

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro : " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await axiosApi.delete(`/usuario/${id}`);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro : " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

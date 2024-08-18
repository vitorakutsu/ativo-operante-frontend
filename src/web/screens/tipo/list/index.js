import { axiosApi } from "@/api/axios-base";

export const getAllTipo = async () => {
  try {
    const response = await axiosApi.get("/tipo/all");

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro : " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTipo = async (id) => {
  try {
    const response = await axiosApi.delete(`/tipo/${id}`);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro : " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

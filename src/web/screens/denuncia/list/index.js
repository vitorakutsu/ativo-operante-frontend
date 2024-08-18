import { axiosApi } from "@/api/axios-base";

export const getAllDenuncias = async () => {
  try {
    const response = await axiosApi.get("/denuncia/all");

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro ao efetuar login: " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

export const deleteDenuncia = async (id) => {
  try {
    const response = await axiosApi.delete(`/denuncia/${id}`);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro ao efetuar login: " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

export const getAllFeedback = async () => {
  try {
    const response = await axiosApi.get(`/feedback/all`);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro ao efetuar login: " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

export const getAllDenunciasByUser = async () => {
  try {
    const response = await axiosApi.get(`/denuncia/user`);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro ao efetuar login: " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

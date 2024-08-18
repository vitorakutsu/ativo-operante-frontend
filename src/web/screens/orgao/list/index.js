import { axiosApi } from "@/api/axios-base";

export const getAllOrgao = async () => {
  try {
    const response = await axiosApi.get("/orgao/all");

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro : " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

export const deleteOrgao = async (id) => {
  try {
    const response = await axiosApi.delete(`/orgao/${id}`);

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Erro : " + response.statusText);
    }
  } catch (error) {
    return error.response.data;
  }
};

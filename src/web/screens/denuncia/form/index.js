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
    return error.response;
  }
};

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

export const createDenuncia = async (data) => {
  try {
    const response = await axiosApi.post("/denuncia/create", {
      titulo: data.titulo,
      texto: data.texto,
      urgencia: data.urgencia,
      orgao: {
        id: data.orgao,
      },
      tipo: {
        id: data.tipo,
      },
      data: data.data,
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

import { axiosApi } from "@/api/axios-base";

export const createFeedback = async (feedback) => {
  try {
    const response = await axiosApi.post("/feedback", {
      texto: feedback.texto,
      denuncia: {
        id: feedback.denunciaId,
      },
    });

    if (response.status === 201) {
      return response;
    } else {
      throw new Error("Erro : " + response.statusText);
    }
  } catch (error) {
    return error.response;
  }
};

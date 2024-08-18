import { axiosApi } from "@/api/axios-base";

export const login = async (email, senha) => {
  try {
    const response = await axiosApi.post("/login", {
      email,
      senha,
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.data);
      return response;
    } else {
      throw new Error("Crendenciais inválidas");
    }
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

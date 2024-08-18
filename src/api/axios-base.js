import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

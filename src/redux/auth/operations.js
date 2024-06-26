import axios from "axios";

export const apiSwagger = axios.create({
  baseURL: "https://connections-api.herokuapp.com/",
});

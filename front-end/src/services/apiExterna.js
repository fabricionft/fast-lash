import axios from "axios"

const apiExterna = axios.create(
  {baseURL: "https://viacep.com.br/ws/"}
);

export default apiExterna;
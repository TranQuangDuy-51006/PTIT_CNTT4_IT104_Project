// import axios from "axios";
// import { toast } from "sonner";

// const axiosClient = axios.create();

// axiosClient.interceptors.request.use((config) => {
//   return config;
// });

// axiosClient.interceptors.response.use((response) => {
//   if (response.data.statusCode == 400) {
//     const keys = Object.keys(response.data.message[0]);
//     const message =
//       typeof response.data.message == "string"
//         ? response.data.message
//         : response.data.message[0][keys[0]];
//     toast.warning(message);
//   }
//   return response.data;
// });

// export default axiosClient;

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;

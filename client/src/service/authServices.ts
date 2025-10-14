import axiosClient from "./index";
import type { RegisterPayload, User, LoginPayload } from "../utils/types";

const authService = {
  signup: async (payload: RegisterPayload) => {
    const res = await axiosClient.post<User>("/users", payload);
    return res.data;
  },

  getAll: async () => {
    const res = await axiosClient.get<User[]>("/users");
    return res.data;
  },

  login: async (payload: LoginPayload) => {
    const res = await axiosClient.get<User[]>("/users");
    const user = res.data.find(
      (u) => u.email === payload.email && u.password === payload.password
    );

    if (!user) throw new Error("Email hoặc mật khẩu không đúng");

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },
};

export default authService;

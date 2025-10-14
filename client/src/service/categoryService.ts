import axiosClient from "./index";
import type { Category } from "../utils/types";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const res = await axiosClient.get("/categories");
    return res.data;
  },

  create: async (name: string): Promise<Category> => {
    const res = await axiosClient.post("/categories", { name });
    return res.data;
  },

  update: async (id: number, name: string): Promise<Category> => {
    const res = await axiosClient.put(`/categories/${id}`, { name });
    return res.data;
  },

  remove: async (id: number) => {
    await axiosClient.delete(`/categories/${id}`);
  },
};

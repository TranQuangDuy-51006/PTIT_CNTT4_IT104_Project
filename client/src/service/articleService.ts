import axiosClient from "./index";
import type { Article } from "../utils/types";

export const articleService = {
  getAll: async (): Promise<Article[]> => {
    const res = await axiosClient.get("/articles");
    return res.data;
  },

  create: async (article: Article): Promise<Article> => {
    const res = await axiosClient.post("/articles", article);
    return res.data;
  },

  update: async (article: Article): Promise<Article> => {
    const res = await axiosClient.put(`/articles/${article.id}`, article);
    return res.data;
  },

  remove: async (id: number) => {
    await axiosClient.delete(`/articles/${id}`);
  },
};

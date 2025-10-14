import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Article } from "../../utils/types";
import { articleService } from "../../service/articleService";

interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk("article/fetchAll", async () => {
  return await articleService.getAll();
});

export const addArticle = createAsyncThunk(
  "article/add",
  async (article: Article) => {
    return await articleService.create(article);
  }
);

export const updateArticle = createAsyncThunk(
  "article/update",
  async (article: Article) => {
    return await articleService.update(article);
  }
);

export const deleteArticle = createAsyncThunk(
  "article/delete",
  async (id: number) => {
    await articleService.remove(id);
    return id;
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.error.message || "Fetch articles failed";
        state.loading = false;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter((a) => a.id !== action.payload);
      });
  },
});

export default articleSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../../utils/types";
import { categoryService } from "../../service/categoryService";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async () => {
    return await categoryService.getAll();
  }
);

export const addCategory = createAsyncThunk(
  "category/add",
  async (name: string) => {
    return await categoryService.create(name);
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, name }: { id: number; name: string }) => {
    return await categoryService.update(id, name);
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: number) => {
    await categoryService.remove(id);
    return id;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || "Fetch failed";
        state.loading = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;

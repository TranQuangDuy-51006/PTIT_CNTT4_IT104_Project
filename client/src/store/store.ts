import { configureStore } from "@reduxjs/toolkit";
import regReducer from "./features/regSlice";
import loginReducer from "./features/loginSlice";
import categoryReducer from "./features/categorySlice";
import articleReducer from "./features/articleSlice";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    register: regReducer,
    login: loginReducer,
    category: categoryReducer,
    article: articleReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

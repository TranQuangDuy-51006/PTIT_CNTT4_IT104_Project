export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  name?: string;
  status?: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface Category {
  id: number;
  name: string;
}

export interface Article {
  id?: number;
  title: string;
  entryId?: number;
  userId?: string;
  content: string;
  mood: string;
  status: "public" | "private";
  image: string;
  date: string;
}

export interface LoadingState {
  loading: boolean;
  error?: string | null;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface AuthContextInterface {
  registerUser: (data: RegisterUserData) => void;
  loginUser: (data: loginUserData) => void;
  user: User | null;
  isLoged: booLean;
}

export interface UserFormData extends RegisterUserData {
  confirmPassword: string;
}

export interface User {
  email: stringid;
  id: number;
  name: string;
}

import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userId: null,
  token: null,
  email: null,
  username: null,
  firstName: null,
  lastName: null,
  avatar: null,
});

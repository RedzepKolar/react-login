import { createContext, useEffect, useReducer } from "react";
import authService from "../services/authService";
import UserService from "../services/UserService";

const initialState = {
  user: UserService.getUser() || null,
  responseKey: null,
};

const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

function authReducer(state, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
        responseKey: action.payload.responseCodes[0].responseKey,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        responseKey: "NO_SESSION",
      };
    default:
      return state;
  }
}

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.user) {
      UserService.setUser(state.user);
    } else {
      UserService.clearUser();
    }
  });

  const login = async (username, password) => {
    try {
      const userData = await authService.login(username, password);
      dispatch({ type: ActionTypes.LOGIN, payload: userData });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR, payload: error });
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: ActionTypes.LOGOUT });
    } catch (error) {
      dispatch({ type: ActionTypes.ERROR, payload: error });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        responseKey: state.responseKey,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

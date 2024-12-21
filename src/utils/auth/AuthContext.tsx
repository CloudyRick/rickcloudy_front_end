import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import axiosInstance from "./AxiosInstance";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { username: string } | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        const decodedUser = JSON.parse(atob(accessToken.split(".")[1]));
        const expirationTime = decodedUser.exp * 1000;

        if (Date.now() >= expirationTime - 30 * 1000) {
          // Access token expired, attempt to refresh
          await refreshAccessToken(refreshToken);
        } else {
          // Access token valid
          setIsAuthenticated(true);
          setUser(decodedUser);
        }
      } catch (error) {
        console.error("Error during auth initialization:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);

    const decodedUser = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT
    setUser(decodedUser);

    const expirationTime = decodedUser.exp * 1000;
    scheduleTokenRefresh(expirationTime, refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      console.log("Attempting to refresh token...");
      // Define the expected response structure
      interface RefreshTokenResponse {
        data: {
          accessToken: string;
          refreshToken: string;
        };
      }
      console.log("Refresh Token invoked");

      // Specify the type for Axios response
      const response = await axiosInstance.post<RefreshTokenResponse>(
        "/auth/refresh-token",
        {
          refreshToken,
        },
        {
          withCredentials: true,
        }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      const decodedUser = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT
      setIsAuthenticated(true);
      setUser(decodedUser);

      // Schedule another refresh
      const expirationTime = decodedUser.exp * 1000;
      scheduleTokenRefresh(expirationTime, newRefreshToken);
    } catch (error) {
      console.error("Error refreshing access token:", error);
      logout();
    }
  };

  const scheduleTokenRefresh = (
    expirationTime: number,
    refreshToken: string
  ) => {
    const refreshTime = expirationTime - Date.now() - 30 * 1000; // Refresh 30 seconds before expiry
    if (refreshTime > 0) {
      console.log(`Scheduling token refresh in ${refreshTime / 1000} seconds`);
      setTimeout(() => refreshAccessToken(refreshToken), refreshTime);
    } else {
      console.warn("Token already expired, refreshing immediately");
      refreshAccessToken(refreshToken);
    }
  };

  useEffect(() => {
    // Automatically check for token expiration periodically
    const interval = setInterval(() => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const decodedUser = JSON.parse(atob(accessToken.split(".")[1]));
        const expirationTime = decodedUser.exp * 1000;

        if (Date.now() >= expirationTime - 30 * 1000) {
          refreshAccessToken(refreshToken);
        }
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

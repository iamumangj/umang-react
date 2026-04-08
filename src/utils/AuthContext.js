import { createContext, useContext, useState, useEffect } from "react";
import { MOCK_USERS } from "./mockUsers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to restore user from localStorage:", error);
        localStorage.removeItem("authUser");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Validate against mock users
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("authUser", JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = (email, password, name) => {
    // Check if user already exists
    const userExists = MOCK_USERS.find((u) => u.email === email);
    if (userExists) {
      return { success: false, error: "Email already registered" };
    }

    // Create new user
    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
    };

    // Add to mock database (in-memory only)
    MOCK_USERS.push({ ...newUser, password });

    setUser(newUser);
    localStorage.setItem("authUser", JSON.stringify(newUser));
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

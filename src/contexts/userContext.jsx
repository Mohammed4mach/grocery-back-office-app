import { createContext, useContext, useState } from "react";

const userContext = createContext({});

export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const value = {
    user,
    setUser,
  };

  return (
    <userContext.Provider value={value} >
      {children}
    </userContext.Provider>
  );
}


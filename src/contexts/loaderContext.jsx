import { createContext, useContext, useState } from "react";

const loaderContext = createContext({});

export const useLoader = () => {
  return useContext(loaderContext);
};

export const LoaderProvider = ({ children }) => {
  const [shown, setShown] = useState(false);

  const showLoader  = () => setShown(true);
  const closeLoader = () => setShown(false);

  const value = {
    shown,
    showLoader,
    closeLoader,
  };

  return (
    <loaderContext.Provider value={value} >
      {children}
    </loaderContext.Provider>
  );
}


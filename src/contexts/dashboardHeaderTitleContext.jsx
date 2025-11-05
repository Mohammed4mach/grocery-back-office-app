import { createContext, useContext, useState } from "react";
import { DashboardTitle } from '@/components';

const dashboardHeaderTitleContext = createContext({});

export const useDashboardTitle = () => {
  return useContext(dashboardHeaderTitleContext);
};

export const DashboardTitleProvider = ({ children }) => {
  const [title, setTitle] = useState(() => <DashboardTitle>Dashboard</DashboardTitle>);

  const value = {
    title,
    setTitle,
  };

  return (
    <dashboardHeaderTitleContext.Provider value={value} >
      {children}
    </dashboardHeaderTitleContext.Provider>
  );
}


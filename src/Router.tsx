import React, { useState, useMemo, createContext } from "react";

type RoutingContextType = {
  page: string;
  setPage?: (arg1: string) => void;
  urlId: string;
  setUrlId?: (arg1: string) => void;
};
export const pagesMapping = {
  list: "list",
  detail: "detail",
};

export const RoutingContext = createContext<RoutingContextType>({
  page: pagesMapping.list,
  urlId: "",
});

const Router = ({ children }) => {
  const urlPath = window.location.pathname.slice(1).toLowerCase();

  const [page, setPage] = useState(urlPath || pagesMapping.list);
  const [urlId, setUrlId] = useState<string>("");

  const value = useMemo(
    () => ({ page, setPage, urlId, setUrlId }),
    [page, setPage, urlId, setUrlId]
  );

  return (
    <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
  );
};

export default Router;

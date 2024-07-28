import { createContext, useMemo } from "react";

const BackEndContext = createContext({
  backEndURL: "",
});

export function BackEndContextProvider({ children }) {
    const contextValue = useMemo(() => ({
        backEndURL: "http://localhost:3000",
      }), []);

  return (
    <BackEndContext.Provider value={contextValue}>
      {children}
    </BackEndContext.Provider>
  );
}


export default BackEndContext;

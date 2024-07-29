import { createContext, useMemo } from "react";

const BackEndContext = createContext({
  backEndURL: "",
  imageBackEndURL: ""
});

export function BackEndContextProvider({ children }) {
    const contextValue = useMemo(() => ({
        backEndURL: "https://food-app-backend-990.netlify.app/.netlify/functions/api",
        imageBackEndURL: "https://food-app-backend-990.netlify.app"
      }), []);

  return (
    <BackEndContext.Provider value={contextValue}>
      {children}
    </BackEndContext.Provider>
  );
}


export default BackEndContext;

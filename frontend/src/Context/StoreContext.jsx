import { createContext, useState } from "react";
export const StoreContext = createContext(null);
// import axios from "axios";

const StoreContextProvider = (props) =>{

  const url = "https://bookreview-backend-q0jw.onrender.com";
  
const [token, setToken] = useState("");
const isLoggedIn = !!token;
  
    const contextValue = {
        url,
        token,
        setToken,
        isLoggedIn,
    }
    return(
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider> 
    )
 }

 export default StoreContextProvider;

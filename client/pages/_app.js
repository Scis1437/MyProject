import "../styles/globals.css";
import { useState, createContext } from "react";
import AppContext from "../context/AppContext";

function MyApp({ Component, pageProps }) {

  const [newOrderPostOpen, setNewOrderPostOpen] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [prop , setProp] = useState(false)
  // return (
  //   // <Component {...pageProps} />

  //     <Component {...pageProps} />

  // )
  const value = [
   newOrderPostOpen, setNewOrderPostOpen , createPostOpen, setCreatePostOpen  , prop , setProp
  ]

  return (
    <AppContext.Provider value={value}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;

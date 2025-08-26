import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const Authcontext = createContext(); 

const Authprovider = ({ children }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Authcontext.Provider value={users}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;

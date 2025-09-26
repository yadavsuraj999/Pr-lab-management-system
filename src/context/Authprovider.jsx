import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext();

const Authprovider = ({ children }) => {
  const [users, setUsers] = useState(null);
  // const neviget = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      // neviget("/login")
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <Authcontext.Provider value={{ users, handleLogout }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;

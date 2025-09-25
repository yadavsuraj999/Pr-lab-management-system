import { useContext } from "react";
import { Authcontext } from "../context/Authprovider";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const admin = useContext(Authcontext);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
    </div>
  );
};

export default Dashboard;

import { useContext } from "react";
import { Authcontext } from "../context/Authprovider";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const admin = useContext(Authcontext);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className=" w-64 h-screen bg-white shadow-md hidden md:flex flex-col justify-between ">
        <div>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-700 hover:text-green-600">Dashboard</a></li>
              <li><Link to={"/view-lab"} href="#" className="text-gray-700 hover:text-green-600">Labs</Link></li>
              <li><Link to={"/view-pcs"} className="text-gray-700 hover:text-green-600">Computers</Link></li>
              <li><a href="#" className="text-gray-700 hover:text-green-600">Students</a></li>
            </ul>
          </nav>
        </div>
        <div className="p-6 mt-8 flex justify-center">
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition font-semibold"
            onClick={() => { admin.handleLogout() }}
          >
            🔒 Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col justify-between">
        <main className="p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to={"/add-lab"} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 hover:border-green-500 text-left">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Labs</h2>
              <p className="text-sm text-gray-500">Create and manage lab environments.</p>
            </Link>

            <Link to={"/add-pcs"} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 hover:border-green-500 text-left">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Computer</h2>
              <p className="text-sm text-gray-500">Register new computer systems.</p>
            </Link>

            <button className="p-6 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200 hover:border-green-500 text-left">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Add Student</h2>
              <p className="text-sm text-gray-500">Enroll a new student profile.</p>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

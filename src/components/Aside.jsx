import { Link } from "react-router-dom";
import { Authcontext } from "../context/Authprovider";
import { useContext, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Optional icons

const Aside = () => {
    const admin = useContext(Authcontext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex md:flex-col justify-between`}
            >
                <div>
                    {/* Mobile Header with Close Button */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
                        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
                        <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-red-500">
                            <FiX size={22} />
                        </button>
                    </div>

                    {/* Desktop Header */}
                    <div className="p-6 border-b border-gray-200 hidden md:block">
                        <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4">
                        <ul className="space-y-3">
                            <li>
                                <Link to={"/dashbord"} className="block px-4 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition">
                                    📊 Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/view-lab" onClick={() => setIsOpen(false)} className="block px-4 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition">
                                    🧪 Labs
                                </Link>
                            </li>
                            <li>
                                <Link to="/view-pcs" onClick={() => setIsOpen(false)} className="block px-4 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition">
                                    💻 Computers
                                </Link>
                            </li>
                            <li>
                                <Link to="/view-student" onClick={() => setIsOpen(false)} className="block px-4 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-700 transition">
                                    🎓 Students
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Logout */}
                <div className="p-6 mt-4">
                    <button
                        className="w-full px-6 py-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition font-semibold"
                        onClick={() => { admin.handleLogout() }}
                    >
                        🔒 Logout
                    </button>
                </div>
            </aside>

            {/* Open Sidebar Button (Mobile) */}
            {!isOpen && (
                <button
                    className="md:hidden fixed top-4 right-4 z-50 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition"
                    onClick={() => setIsOpen(true)}
                >
                    <FiMenu size={20} />
                </button>
            )}
        </>
    );
};

export default Aside;

// import { Link } from "react-router-dom"
// import { Authcontext } from "../context/Authprovider";
// import { useContext } from "react";

// const Aside = () => {
//     const admin = useContext(Authcontext);
//     return (
//         <div>
//             <div className="min-h-screen bg-gray-100 flex">
//                 <aside className=" w-64 h-screen bg-white shadow-md hidden md:flex flex-col justify-between ">
//                     <div>
//                         <div className="p-6 border-b border-gray-200">
//                             <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
//                         </div>
//                         <nav className="p-4">
//                             <ul className="space-y-4">
//                                 <li><a href="#" className="text-gray-700 hover:text-green-600">Dashboard</a></li>
//                                 <li><Link to={"/view-lab"} href="#" className="text-gray-700 hover:text-green-600">Labs</Link></li>
//                                 <li><a href="#" className="text-gray-700 hover:text-green-600">Computers</a></li>
//                                 <li><a href="#" className="text-gray-700 hover:text-green-600">Students</a></li>
//                             </ul>
//                         </nav>
//                     </div>
//                     <div className="p-6 mt-8 flex justify-center">
//                         <button
//                             className="px-6 py-3 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition font-semibold"
//                             onClick={() => { admin.handleLogout() }}
//                         >
//                             🔒 Logout
//                         </button>
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     )
// }

// export default Aside
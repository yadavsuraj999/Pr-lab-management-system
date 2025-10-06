import { useContext } from "react";
import { Labcontext } from "../../context/Labprovider";
import { Link } from "react-router-dom";

const Viewlab = () => {
  const { allLab, deleteLab, setIsEdit } = useContext(Labcontext);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-6 pt-28  transition-all duration-300">
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            🧪 All Labs
          </h1>
          <Link
            to="/add-lab"
            className="text-sm font-semibold bg-green-600 px-3 py-2 rounded-md text-white hover:bg-green-700 transition"
          >
            ➕ Add Lab
          </Link>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-center">Capacity</th>
                <th className="px-6 py-4 text-center">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allLab.length > 0 ? (
                allLab.map((lab) => (
                  <tr
                    key={lab.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {lab.name}
                    </td>
                    <td className="px-6 py-4">{lab.location}</td>
                    <td className="px-6 py-4 text-center">{lab.currentCapacity}</td>
                    <td className="px-6 py-4 text-center">
                      {lab.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center space-x-4">
                      <Link
                        to="/add-lab"
                        className="text-green-600 hover:underline font-medium"
                        onClick={() => setIsEdit(lab)}
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        className="text-red-600 hover:underline font-medium"
                        onClick={() => deleteLab(lab.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-600"
                  >
                    🚫 No Labs Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Viewlab;

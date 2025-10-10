import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pcscontext } from "../../context/Pcsprovider";
import { Labcontext } from "../../context/Labprovider";

const Viewpcs = () => {
  const { pcs, deletePcs, editPc } = useContext(Pcscontext);
  const { allLab } = useContext(Labcontext);
  const navigate = useNavigate()
  const showLab = (labId) => {
    const labName = allLab.find((lab) => lab.id === labId);
    return labName?.name || "Unknown Lab";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 text-gray-800 px-4 py-10 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">🖥️ All PCs</h1>
          <Link
            to="/add-pcs"
            className="text-sm font-semibold bg-green-600 px-3 py-2 rounded-md text-white hover:bg-green-700 transition"
          >
            ➕ Add PC
          </Link>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4 ">Lab</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pcs.length > 0 ? (
                pcs.map((pc) => (
                  <tr
                    key={pc.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {pc.name}
                    </td>
                    <td className="px-6 py-4 ">{showLab(pc.lab)}</td>
                    <td className="px-6 py-4">{pc.status}</td>
                    <td className="px-6 py-4">
                      {pc.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center space-x-4">
                      <Link
                        to={`/edit-pc/${pc.id}`}
                        className="text-green-600 hover:underline font-medium"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => deletePcs(pc.id)}
                        className="text-red-600 hover:underline font-medium"
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
                    🚫 No PCs Found
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

export default Viewpcs;

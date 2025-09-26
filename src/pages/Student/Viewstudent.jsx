import { useContext } from "react";
import { Link } from "react-router-dom";
import { Pcscontext } from "../../context/Pcsprovider";
import { Labcontext } from "../../context/Labprovider";
import { StudentContext } from "../../context/Studentprovider";

const Viewstudent = () => {
  const { student, deleteStudent, setIsEdit } = useContext(StudentContext);
  const { allLab } = useContext(Labcontext);
  const { pcs } = useContext(Pcscontext);

  const getLabName = (labId) => {
    const lab = allLab.find((lab) => lab.id === labId);
    return lab ? lab.name : "Unknown Lab";
  };

  const getPcName = (pcId) => {
    const pc = pcs.find((pc) => pc.id === pcId);
    return pc ? pc.name : "Unknown PC";
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 pt-28 py-10 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800">🎓 All Students</h1>
          <Link
            to="/add-student"
            className="text-sm font-semibold bg-green-600 px-3 py-2 rounded-md text-white hover:bg-green-700 transition"
          >
            ➕ Add Student
          </Link>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">GR ID</th>
                <th className="px-6 py-4">Lab</th>
                <th className="px-6 py-4">PC</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {student.length > 0 ? (
                student.map((stu) => (
                  <tr key={stu.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{stu.name}</td>
                    <td className="px-6 py-4">{stu.email}</td>
                    <td className="px-6 py-4">{stu.grid}</td>
                    <td className="px-6 py-4">{getLabName(stu.lab)}</td>
                    <td className="px-6 py-4">{getPcName(stu.pc)}</td>
                    <td className="px-6 py-4">
                      {stu.createAt?.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center space-x-4">
                      <Link
                        to={`/edit-student/${stu.id}`}
                        onClick={() => setIsEdit(stu)}
                        className="text-green-600 hover:underline font-medium"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => deleteStudent(stu)}
                        className="text-red-600 hover:underline font-medium"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-600">
                    🚫 No Students Found
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

export default Viewstudent;

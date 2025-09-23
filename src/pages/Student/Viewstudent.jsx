import { useContext } from "react";
import { Pcscontext } from "../../context/Pcsprovider";
import { Labcontext } from "../../context/Labprovider";
import { StudentContext } from "../../context/Studentprovider";
import { Link, useNavigate } from "react-router-dom";

const Viewstudent = () => {
    const { allLab } = useContext(Labcontext);
    const { pcs } = useContext(Pcscontext);
    const { student, deleteStudent, setIsEdit, editStudent } = useContext(StudentContext);

    const navigate = useNavigate()



    const getLabName = (labId) => {
        const lab = allLab.find((lab) => lab.id === labId);
        return lab ? lab.name : "Something went worng....";
    };

    const getPcName = (pcId) => {
        const pc = pcs.find((pc) => pc.id === pcId);
        return pc ? pc.name : "Something went worng....";
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        All Students
                    </h1>
                    <Link
                        to="/add-student"
                        className="text-sm font-semibold bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-700 transition"
                    >
                        Add Student
                    </Link>
                </div>

                <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-800">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">GR ID</th>
                                <th className="px-6 py-4">Lab</th>
                                <th className="px-6 py-4">PC</th>
                                <th className="px-6 py-4">CreateAt</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.length > 0 ? (
                                student.map((stu) => (
                                    <tr
                                        key={stu.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                                            {stu.name}
                                        </td>
                                        <td className="px-6 py-4">{stu.email}</td>
                                        <td className="px-6 py-4">{stu.grid}</td>
                                        <td className="px-6 py-4">{getLabName(stu.lab)}</td>
                                        <td className="px-6 py-4">{getPcName(stu.pc)}</td>
                                        <td className="px-6 py-4">{stu.createAt?.toDate().toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-center space-x-4">
                                            <Link
                                                to={`/edit-student/${stu.id}`}
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                                onClick={() => {
                                                    setIsEdit(stu)
                                                }}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="text-red-600 dark:text-red-400 hover:underline"
                                                onClick={() => deleteStudent(stu.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-6 text-gray-700 dark:text-gray-300"
                                    >
                                        No Students Found
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

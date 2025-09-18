import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Pcscontext } from "../../context/Pcsprovider";
import { Labcontext } from "../../context/Labprovider";

const Viewpcs = () => {
    const { pcs, deletePcs, editPc, setIsPcEdit } = useContext(Pcscontext);
    const { allLab } = useContext(Labcontext)



    const showLab = (labId) => {
        const labName = allLab.find((lab) => {
            return lab.id == labId
        })
        return labName?.name
    }


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        All PCs
                    </h1>
                    <Link
                        to="/add-pcs"
                        className="text-sm font-semibold bg-blue-600 px-4 py-2 rounded-xl text-white hover:bg-blue-700 transition"
                    >
                        Add PC
                    </Link>
                </div>

                <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-800">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Lab</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Createat</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pcs.length > 0 ? (
                                pcs.map((pc) => (
                                    <tr
                                        key={pc.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {pc.name}
                                        </td>
                                        <td className="px-6 py-4">{showLab(pc.lab)}</td>
                                        <td className="px-6 py-4">{pc.status}</td>
                                        <td className="px-6 py-4">{pc.createdAt.toDate().toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-center space-x-4">
                                            <Link
                                                to={"/add-pcs"}
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                                onClick={() => setIsPcEdit(pc)}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="text-red-600 dark:text-red-400 hover:underline"
                                                onClick={() => deletePcs(pc.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-6 text-gray-700 dark:text-gray-300"
                                    >
                                        No PCs Found
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

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pcscontext } from "../../context/Pcsprovider";
import { Labcontext } from "../../context/Labprovider";
import { Link, useNavigate } from "react-router-dom";

const Addpcs = () => {
    const { addPcs, editPc, isPcEdit, setIsPcEdit } = useContext(Pcscontext);
    const { allLab } = useContext(Labcontext);

    const [addpc, setPc] = useState({
        name: "",
        lab: "",
        status: "",
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setPc({ ...addpc, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isPcEdit) {
            setPc(isPcEdit);
        }
    }, [isPcEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!addpc.name || !addpc.lab || !addpc.status) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (isPcEdit) {
            await editPc(isPcEdit.id, addpc)
        } else {
            await addPcs(addpc);
        }
        setPc({ name: "", lab: "", status: "" });
        setIsPcEdit(null)
        navigate("/view-pcs")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isPcEdit ? "Edit Pc" : "Add Pc"}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Please fill in the information below
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            PC Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={addpc.name}
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lab"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select Lab
                        </label>
                        <select
                            id="lab"
                            name="lab"
                            value={addpc.lab}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Select Lab</option>
                            {allLab.map((lab) => (
                                <option key={lab.id} value={lab.id}>
                                    {lab.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="status"
                            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            PC Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={addpc.status}
                            onChange={handleChange}
                            required
                            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition"
                    >
                        {isPcEdit ? "Edit Pc" : "Add Pc"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addpcs;

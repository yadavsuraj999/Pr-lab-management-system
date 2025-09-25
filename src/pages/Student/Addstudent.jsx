import { useContext, useEffect, useState } from "react";
import { Labcontext } from "../../context/Labprovider";
import { Pcscontext } from "../../context/Pcsprovider";
import { StudentContext } from "../../context/Studentprovider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Aside from "../../components/Aside";

const Addstudent = () => {
    const { allLab } = useContext(Labcontext);
    const { pcs } = useContext(Pcscontext);
    const { addStudent, isEdit, setIsEdit, editStudent } = useContext(StudentContext);

    const [inputstudent, setInputStudent] = useState({
        name: "",
        email: "",
        grid: "",
        lab: "",
        pc: "",
    });

    const [pcOption, setPcOption] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit) {
            setInputStudent({
                name: isEdit.name || "",
                email: isEdit.email || "",
                grid: isEdit.grid || "",
                lab: isEdit.lab || "",
                pc: isEdit.pc || "",
            });
        }
    }, [isEdit]);

    useEffect(() => {
        const opPcs = pcs.filter((pc) => {
            return pc.lab === inputstudent.lab && pc.status === "Available";
        });
        setPcOption(opPcs);
    }, [inputstudent.lab, pcs]);

    const handleChange = (e) => {
        setInputStudent({ ...inputstudent, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            inputstudent.name.trim() === "" ||
            inputstudent.email.trim() === "" ||
            inputstudent.grid.trim() === "" ||
            inputstudent.lab.trim() === "" ||
            inputstudent.pc.trim() === ""
        ) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (isEdit && isEdit.id) {
            await editStudent(isEdit.id, inputstudent);
            toast.success("Student edited successfully!");
        } else {
            await addStudent(inputstudent);
            toast.success("Student added successfully!");
        }

        setInputStudent({ name: "", email: "", grid: "", lab: "", pc: "" });
        setIsEdit(null);
        navigate("/view-student");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-[500px] mx-auto bg-white border border-gray-200 shadow-md rounded-xl p-8">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">
                        {isEdit ? "Update Student" : "Create a Student"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {isEdit ? "Update the details of the student." : "Enter the details to create a new student."}
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={inputstudent.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
                            placeholder="Enter student's name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={inputstudent.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
                            placeholder="Enter student's email"
                        />
                    </div>

                    {/* GRID */}
                    <div>
                        <label htmlFor="grid" className="block text-sm font-medium text-gray-700 mb-1">
                            GRID
                        </label>
                        <input
                            type="number"
                            id="grid"
                            value={inputstudent.grid}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
                            placeholder="Enter student's GRID"
                        />
                    </div>

                    {/* Lab Select Dropdown */}
                    <div>
                        <label htmlFor="lab" className="block text-sm font-medium text-gray-700 mb-1">
                            Select Lab
                        </label>
                        <select
                            id="lab"
                            value={inputstudent.lab}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
                        >
                            <option value="">Select Lab</option>
                            {allLab.map((lab) => (
                                <option key={lab.id} value={lab.id}>
                                    {lab.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* PC Select Dropdown */}
                    <div>
                        <label htmlFor="pc" className="block text-sm font-medium text-gray-700 mb-1">
                            Select PC
                        </label>
                        <select
                            id="pc"
                            value={inputstudent.pc}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
                        >
                            <option value="">Select PC</option>
                            {pcOption.map((optionpc) => (
                                <option key={optionpc.id} value={optionpc.id}>
                                    {optionpc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition"
                    >
                        {isEdit ? "Update Student" : "Add Student"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addstudent;

import { useContext, useState } from "react";
import { Labcontext } from "../../context/Labprovider";
import { useNavigate } from "react-router-dom";

const Addlabs = () => {

    const { addLab, isEdit } = useContext(Labcontext)

    const [labinput, setLabInput] = useState({
        name: "", location: "", capacity: ""
    })


    const naviget = useNavigate()

    const handleChange = (e) => {
        setLabInput({ ...labinput, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addLab(labinput)
        setLabInput({ name: "", location: "", capacity: "" })
        naviget("/view-lab")
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isEdit ? "Update Lab" : "Creat a Lab"}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Please fill in the information below</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={labinput.name}
                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            value={labinput.location}
                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="capacity" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Capacity
                        </label>
                        <input
                            type="text"
                            id="capacity"
                            value={labinput.capacity}
                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {isEdit ? <button
                        type="submit"
                        className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition"
                    >
                        Update Lab
                    </button>
                        :
                        <button
                            type="submit"
                            className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition"
                        >
                            Add-Lab
                        </button>}
                </form>
            </div>
        </div>
    );
};

export default Addlabs;

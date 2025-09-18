import { useState } from "react"

const Addstudent = () => {
    const [inputstudent, setInputStuden] = useState({
        name: "", Email: "", grid: "", lab: "", pc: ""
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Add Student
                    </h2>
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
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="grid" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            GRID
                        </label>
                        <input
                            type="number"
                            id="grid"
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
                            htmlFor="lab"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select Lab
                        </label>
                        <select
                            id="lab"
                            name="lab"
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

                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition"
                    >
                        {isEdit ? "Update Lab" : "Add Lab"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addstudent
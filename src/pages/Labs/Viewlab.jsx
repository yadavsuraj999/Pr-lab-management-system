import { useContext } from "react";
import { Labcontext } from "../../context/Labprovider";
import { Link } from "react-router-dom";

const Viewlab = () => {

  const { allLab, deleteLab, setIsEdit } = useContext(Labcontext)




  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">All Labs</h1>

        <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-800">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Location</th>
                <th scope="col" className="px-6 py-4">Capacity</th>
                <th scope="col" className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allLab.map((lab) => {
                return (
                  <tr key={lab.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{lab.name}</td>
                    <td className="px-6 py-4">{lab.location}</td>
                    <td className="px-6 py-4">{lab.capacity}</td>
                    <td className="px-6 py-4 text-center space-x-4">
                      <Link to={"/add-lab"} className="text-blue-600 dark:text-blue-400 hover:underline" onClick={() => setIsEdit(true)}>Edit</Link>
                      <button className="text-red-600 dark:text-red-400 hover:underline" onClick={() => deleteLab(lab.id)}>Delete</button>
                    </td>
                  </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Viewlab;

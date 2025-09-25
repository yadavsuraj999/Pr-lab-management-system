import { useContext, useEffect, useState } from "react";
import { Labcontext } from "../../context/Labprovider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Addlabs = () => {
  const { addLab, isEdit, editLab, setIsEdit } = useContext(Labcontext);
  const [labinput, setLabInput] = useState({ name: "", location: "", capacity: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      setLabInput(isEdit);
    }
  }, [isEdit]);

  const handleChange = (e) => {
    setLabInput({ ...labinput, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      labinput.name.trim() === "" ||
      labinput.location.trim() === "" ||
      labinput.capacity.trim() === ""
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isEdit) {
      await editLab(isEdit.id, labinput);
    } else {
      await addLab(labinput);
    }

    setLabInput({ name: "", location: "", capacity: "" });
    setIsEdit(null);
    navigate("/view-lab");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center  transition-all duration-300">
      <div className="w-[500px] mx-auto bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {isEdit ? "Update Lab" : "Create a Lab"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isEdit
              ? "Update the details of the lab."
              : "Enter the details to create a new lab."}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Lab Name
            </label>
            <input
              type="text"
              id="name"
              value={labinput.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
              placeholder="Enter lab name"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={labinput.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
              placeholder="e.g. Building A, Floor 2"
            />
          </div>

          {/* Capacity */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              value={labinput.capacity}
              onChange={handleChange}
              disabled={isEdit}
              className={`w-full px-4 py-2 rounded-md border ${
                isEdit ? "bg-gray-200 cursor-not-allowed" : "bg-gray-50"
              } border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800`}
              placeholder="Enter number of computers"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition"
          >
            {isEdit ? "Update Lab" : "Add Lab"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addlabs;

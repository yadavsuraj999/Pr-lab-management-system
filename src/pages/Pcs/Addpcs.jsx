import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pcscontext } from "../../context/Pcsprovider";
import { Labcontext } from "../../context/Labprovider";
import { useNavigate } from "react-router-dom";

const Addpcs = () => {
  const { addPcs, editPc, isPcEdit, setIsPcEdit } = useContext(Pcscontext);
  const { allLab } = useContext(Labcontext);

  const [addpc, setPc] = useState({ name: "", lab: "" });
  const navigate = useNavigate();

  const options = allLab.filter((lab) => lab.currentCapacity > 0);

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
    if (addpc.name.trim() === "" || addpc.lab.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isPcEdit) {
      await editPc(isPcEdit.id, addpc);
    } else {
      await addPcs(addpc);
    }

    toast.success("PC added successfully.");
    setPc({ name: "", lab: "" });
    setIsPcEdit(null);
    navigate("/view-pcs");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
      <div className="w-[500px] mx-auto bg-white border border-gray-200 shadow-md rounded-xl p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{isPcEdit ? "Update PC" : "Create a PC"}</h2>
          <p className="text-gray-500 text-sm">
            {isPcEdit ? "Update the details of the PC." : "Enter the details to create a new PC."}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* PC Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              PC Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={addpc.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
              placeholder="Enter PC name"
            />
          </div>

          {/* Lab Select Dropdown */}
          <div>
            <label htmlFor="lab" className="block text-sm font-medium text-gray-700 mb-1">
              Select Lab
            </label>
            <select
              id="lab"
              name="lab"
              value={addpc.lab}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
            >
              <option value="">Select Lab</option>
              {options.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.name}
                </option>
              ))}
              {options.length === 0 && (
                <option value="" disabled className="text-gray-500">
                  No labs available
                </option>
              )}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition"
          >
            {isPcEdit ? "Update PC" : "Add PC"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpcs;

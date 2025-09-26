import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const neviget = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      neviget("/");
    } catch (error) {
      toast.error("invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center transition-all duration-300">
      <div className="w-[500px] mx-auto bg-white border border-gray-200 shadow-md rounded-xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Please login to continue</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Your Password
            </label>
            <input
              type="password"
              id="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

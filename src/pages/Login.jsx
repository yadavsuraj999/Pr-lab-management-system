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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      navigate("/");
      return
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 px-6 sm:px-8 md:px-10 py-10 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
            Welcome!
          </h2>
          <p className="text-gray-500 mb-8 text-sm text-center md:text-left">
            Sign into your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.id]: e.target.value })
                }
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.id]: e.target.value })
                }
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-sm space-y-2 sm:space-y-0">
              <button
                type="button"
                className="text-teal-600 hover:underline"
              >
                Change your password
              </button>
              <button
                type="button"
                className="text-teal-600 hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              className="login w-full py-3 rounded-md  text-white font-semibold transition"
            >
              LOGIN
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-400 to-teal-700 flex items-center justify-center p-8 md:p-0">
          <img
            src="/images/5243758-removebg-preview.png"
            alt="Coffee Cup"
            className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

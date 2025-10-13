import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Forgotpassword = () => {
  const [input, setInput] = useState({ email: "" });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    if (!input.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, input.email);
      toast.success("Password reset email sent! Check your inbox.");
      setInput({ email: "" });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with that email.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 px-6 sm:px-8 md:px-10 py-10 md:py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
            Forgot password?
          </h2>
          <p className="text-gray-500 mb-8 text-sm text-center md:text-left">
            Enter the email address you used when you joined and we’ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-semibold transition"
            >
              Continue
            </button>

            <div>
                <button className="">
                    Return to <Link to={"/login"} href="" className="text-sky-400">Sign In</Link>
                </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-br from-cyan-400 to-teal-700 flex items-center justify-center p-8 md:p-0">
          <img
            src="/images/5243758-removebg-preview.png"
            alt="Forgot password illustration"
            className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;

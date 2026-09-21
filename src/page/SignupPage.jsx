import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "https://backend-lilac-six-27.vercel.app/api/user/current",
          { withCredentials: true }
        );

        if (res.data) {
          navigate("/");
        }
      } catch {
        // User is not logged in
      }
    };

    checkUser();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://backend-lilac-six-27.vercel.app/api/user/register",
        formData
      );

      toast.success("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "user",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl grid md:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">

        {/* LEFT — BRAND / VALUE */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent">

          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                B
              </div>

              <span className="text-xl font-bold text-white">
                B2B Connect
              </span>
            </div>

            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Build. Connect. Grow.
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white">
              Build your business
              <span className="block text-indigo-400">
                with better connections.
              </span>
            </h1>

            <p className="mt-6 text-slate-400 leading-relaxed max-w-md">
              Create your account and explore products, suppliers,
              manufacturers and business opportunities through one
              connected platform.
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Discover wholesale products
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Connect with suppliers and factories
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Manage orders and deliveries
            </div>
          </div>
        </div>

        {/* RIGHT — SIGNUP */}
        <div className="p-6 sm:p-10 bg-slate-900/70">

          <div className="max-w-md mx-auto">

            <div className="mb-8">
              <p className="text-indigo-400 text-sm font-semibold mb-2">
                GET STARTED
              </p>

              <h2 className="text-3xl font-bold text-white">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Join B2B Connect and start building your business network.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition shadow-lg shadow-indigo-600/20"
              >
                {loading ? "Creating your account..." : "Create Account"}
              </button>
            </form>

            {/* LOGIN OPTION */}
            <div className="mt-7 text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500 leading-relaxed">
              By creating an account, you agree to our terms and
              acknowledge our privacy practices.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
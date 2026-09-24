import React, { useState, useContext } from "react";
import { AuthContext } from "../Context.jsx/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../component/Loder";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const success = await login(formData);

      if (success) {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch {
      toast.error("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {loading && <Loader text="Signing you in..." />}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-5xl grid md:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">

          {/* LEFT — AI BRAIN TUMOR DETECTION */}
          <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent">

            <div>
              {/* BRAND */}
              <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                  AI
                </div>

                <span className="text-xl font-bold text-white">
                  Brain Tumor Detection
                </span>
              </div>

              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
                AI-Powered Detection
              </p>

              <h1 className="text-4xl font-bold leading-tight text-white">
                Understand.
                <span className="block text-indigo-400">
                  Detect. Protect.
                </span>
              </h1>

              <p className="mt-6 text-slate-400 leading-relaxed max-w-md">
                Our AI-powered brain tumor detection system helps analyze
                brain MRI scans and identify patterns that may be associated
                with different types of brain tumors.
              </p>

              <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-md">
                Upload your MRI scan and use our machine-learning model to
                receive a preliminary prediction. This system is designed
                for educational and research purposes and should not replace
                professional medical diagnosis.
              </p>
            </div>

            {/* FEATURES */}
            <div className="space-y-4 text-sm text-slate-400">

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                AI-assisted MRI analysis
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Multiple tumor categories
              </div>

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Fast prediction results
              </div>

            </div>
          </div>

          {/* RIGHT — LOGIN FORM */}
          <div className="p-6 sm:p-10 bg-slate-900/70">

            <div className="max-w-md mx-auto">

              {/* HEADER */}
              <div className="mb-8">
                <p className="text-indigo-400 text-sm font-semibold mb-2">
                  SIGN IN
                </p>

                <h2 className="text-3xl font-bold text-white">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Sign in to continue to your Brain Tumor Detection account.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">

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
                    autoComplete="email"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition duration-200 shadow-lg shadow-indigo-600/20"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>

                {/* SIGNUP OPTION */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-800" />

                  <span className="px-4 text-xs text-slate-500">
                    NEW TO BRAIN TUMOR DETECTION?
                  </span>

                  <div className="flex-grow border-t border-slate-800" />
                </div>

                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center py-3.5 rounded-xl border border-slate-700 bg-slate-800/60 hover:bg-slate-800 hover:border-indigo-500/50 text-slate-200 font-semibold transition duration-200"
                >
                  Create an Account
                </Link>
              </form>

              {/* FOOTER */}
              <p className="mt-7 text-center text-xs text-slate-500 leading-relaxed">
                This AI system provides preliminary predictions and is not a
                substitute for professional medical diagnosis.
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

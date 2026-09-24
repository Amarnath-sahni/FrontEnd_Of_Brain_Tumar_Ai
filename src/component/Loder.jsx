import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin" />

        {/* Loading text */}
        <p className="text-sm font-medium text-white">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Loader;

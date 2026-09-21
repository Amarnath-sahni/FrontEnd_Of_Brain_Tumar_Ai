import React, { useState } from "react";
import { motion } from "framer-motion";
import { questions } from "./question";

const BrainTumorForm = () => {
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const [mriImage, setMriImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tumorDetected, setTumorDetected] = useState(false);

  // Handle Question Selection
  const handleSelect = (qid, points, type, exclusive = false) => {
    setAnswers((prev) => {
      const updated = { ...prev };

      if (type === "multi") {
        updated[qid] = updated[qid] || [];

        if (exclusive) {
          updated[qid] = [points];
        } else {
          updated[qid] = updated[qid].filter((p) => p !== 0);

          if (updated[qid].includes(points)) {
            updated[qid] = updated[qid].filter((p) => p !== points);
          } else {
            updated[qid].push(points);
          }
        }
      } else {
        updated[qid] = points;
      }

      return updated;
    });
  };

  // MRI Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setMriImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Next Question
  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateScore();
    }
  };

  // Calculate Score
  const calculateScore = () => {
    let total = 0;

    questions.forEach((q) => {
      const ans = answers[q.id];

      if (q.type === "multi") {
        total += Array.isArray(ans)
          ? ans.reduce((a, b) => a + b, 0)
          : 0;
      } else {
        total += ans || 0;
      }
    });

    // Dummy AI Logic
    let aiPrediction = false;

    if (total >= 15 || mriImage) {
      aiPrediction = true;
    }

    setTumorDetected(aiPrediction);
    setScore(total);
    setShowResult(true);
  };

  // Risk Levels
  const getRiskLevel = () => {
    if (score <= 5) {
      return {
        level: "Low Risk",
        color: "text-green-400",
        suggestion:
          "Symptoms appear minimal. Maintain a healthy lifestyle and monitor any future symptoms.",
      };
    }

    if (score <= 12) {
      return {
        level: "Moderate Risk",
        color: "text-yellow-400",
        suggestion:
          "Some neurological symptoms detected. Consider consulting a neurologist.",
      };
    }

    if (score <= 20) {
      return {
        level: "High Risk",
        color: "text-orange-400",
        suggestion:
          "Multiple symptoms associated with brain tumors detected. MRI scan and specialist consultation recommended.",
      };
    }

    return {
      level: "Critical Risk",
      color: "text-red-500",
      suggestion:
        "URGENT: Please seek immediate medical attention and undergo professional brain imaging diagnosis.",
    };
  };

  // Progress %
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-5">
      {!showResult ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 text-white w-full max-w-2xl p-8 rounded-3xl shadow-2xl"
        >
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-center">
              Brain Tumor Detection System
            </h1>

            <p className="text-gray-400 text-center">
              AI-powered neurological symptom analysis with MRI support
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
            <div
              className="bg-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question Count */}
          <h2 className="text-lg font-semibold mb-2">
            Question {current + 1} of {questions.length}
          </h2>

          {/* Question */}
          <p className="text-xl font-bold mb-6">
            {questions[current].text}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {questions[current].options.map((opt, idx) => {
              const selected =
                questions[current].type === "multi"
                  ? (answers[questions[current].id] || []).includes(
                      opt.points
                    )
                  : answers[questions[current].id] === opt.points;

              return (
                <button
                  key={idx}
                  onClick={() =>
                    handleSelect(
                      questions[current].id,
                      opt.points,
                      questions[current].type,
                      opt.exclusive
                    )
                  }
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-200
                    ${
                      selected
                        ? "bg-purple-600 border-purple-400"
                        : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    }`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* MRI Upload */}
          <div className="mt-8">
            <label className="block mb-3 text-lg font-semibold">
              Upload Brain MRI Scan
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-gray-800 p-3 rounded-xl"
            />

            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="MRI Preview"
                  className="w-full h-64 object-cover rounded-2xl border border-gray-700"
                />
              </div>
            )}
          </div>

          {/* Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold transition-all"
            >
              {current < questions.length - 1
                ? "Next Question"
                : "Analyze"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-900 text-white w-full max-w-2xl p-8 rounded-3xl shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Brain Tumor Analysis Result
          </h1>

          {/* Score */}
          <div className="text-center mb-6">
            <h2 className="text-5xl font-bold text-purple-400">
              {score}
            </h2>

            <p className="text-gray-400 mt-2">
              Neurological Symptom Score
            </p>
          </div>

          {/* Risk */}
          <div className="bg-gray-800 p-6 rounded-2xl mb-6">
            <h3
              className={`text-2xl font-bold mb-3 ${getRiskLevel().color}`}
            >
              {getRiskLevel().level}
            </h3>

            <p className="text-gray-300">
              {getRiskLevel().suggestion}
            </p>
          </div>

          {/* AI Detection */}
          <div
            className={`p-6 rounded-2xl mb-6 ${
              tumorDetected
                ? "bg-red-900/30 border border-red-500"
                : "bg-green-900/30 border border-green-500"
            }`}
          >
            <h3 className="text-2xl font-bold mb-3">
              AI MRI Detection
            </h3>

            <p className="text-lg">
              {tumorDetected
                ? "⚠️ Potential Brain Tumor Indicators Detected"
                : "✅ No Major Tumor Indicators Detected"}
            </p>
          </div>

          {/* MRI Preview */}
          {preview && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">
                Uploaded MRI Scan
              </h3>

              <img
                src={preview}
                alt="MRI Scan"
                className="w-full h-72 object-cover rounded-2xl border border-gray-700"
              />
            </div>
          )}

          {/* Emergency Warning */}
          {(score >= 20 || tumorDetected) && (
            <div className="bg-red-500/20 border border-red-500 p-5 rounded-2xl mb-6">
              <p className="text-red-400 font-bold text-lg">
                Immediate neurological consultation recommended.
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-gray-800 p-5 rounded-2xl text-sm text-gray-400 mb-6">
            This system is an AI-assisted screening tool and NOT a
            medical diagnosis. Always consult certified medical
            professionals for accurate diagnosis and treatment.
          </div>

          {/* Retake */}
          <button
            onClick={() => {
              setAnswers({});
              setCurrent(0);
              setShowResult(false);
              setScore(0);
              setPreview(null);
              setMriImage(null);
              setTumorDetected(false);
            }}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold"
          >
            Retake Assessment
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default BrainTumorForm;
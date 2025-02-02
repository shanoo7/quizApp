import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function Quiz() {
  const {
    quizData,
    currentQuestion,
    setCurrentQuestion,
    score,
    setScore,
    streak,
    setStreak,
    isLoading,
    error,
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  // Debugging logs for data verification
  // useEffect(() => {
  //   console.log("Current question structure:", {
  //     description: quizData?.[currentQuestion]?.description,
  //     options: quizData?.[currentQuestion]?.options,
  //     fullData: quizData?.[currentQuestion],
  //   });
  // }, [quizData, currentQuestion]);

  // Data normalization
  const questions = Array.isArray(quizData) ? quizData : [];
  const totalQuestions = questions.length;
  const currentQuestionData = questions[currentQuestion] || {};

  // Timer management
  useEffect(() => {
    const timer = timeLeft > 0 && setInterval(() =>
      setTimeLeft(prev => prev - 1), 1000
    );
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Move to the next question when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      // Automatically move to the next question
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30); // Reset timer for the next question
      } else {
        navigate("/results");
      }
    }
  }, [timeLeft, currentQuestion, totalQuestions, setCurrentQuestion, navigate]);

  // Reset timer when the question changes
  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestion]);

  // Answer handling logic
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10 + streak * 2);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }

    setSelectedAnswer(isCorrect);

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate("/results");
      }
      setSelectedAnswer(null);
    }, 1000);
  };

  // Loading and error states
  if (isLoading) return <div className="text-center p-8">Loading quiz...</div>;
  if (error || !totalQuestions) {
    return (
      <div className="text-center p-8 text-red-500">
        {error || "Quiz data not available"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              Question {currentQuestion + 1}/{totalQuestions}
            </span>
            <div className="flex gap-3">
              <span className="bg-orange-500 px-3 py-1 rounded-full text-white text-sm">
                🔥 {streak} Streak
              </span>
              <span className="bg-blue-500 px-3 py-1 rounded-full text-white text-sm">
                ⏳ {timeLeft}s
              </span>
            </div>
          </div>

          <div className="h-2 bg-gray-200 rounded-full mt-3">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            {currentQuestionData.description || "Question text unavailable"}
          </h2>

          {/* Answers Section */}
          <div className="grid gap-4">
            {currentQuestionData.options ? (
              currentQuestionData.options.length > 0 ? (
                currentQuestionData.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.is_correct)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 text-left rounded-lg transition-all
                      ${selectedAnswer === null
                        ? "bg-gray-50 hover:bg-gray-100 hover:scale-[1.02]"
                        : option.is_correct
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"}
                    `}
                  >
                    {option.description || "Unlabeled answer option"}
                  </button>
                ))
              ) : (
                <div className="text-center text-yellow-600 p-4 bg-yellow-50 rounded-lg">
                  No answers available for this question
                </div>
              )
            ) : (
              <div className="text-center text-red-500 p-4 bg-yellow-50 rounded-lg">
                Answer data structure missing
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
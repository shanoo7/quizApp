import Confetti from 'react-confetti';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';

export default function Results() {
  const { score, quizData } = useQuiz();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-primary mb-4">🏆 Results</h1>
        
        <div className="space-y-4 mb-6">
          <div className="text-2xl font-semibold">
            Total Score: <span className="text-success">{score}</span>
          </div>
          <div className="text-lg">
            Correct Answers: {Math.floor(score / 10)}/{quizData.length}
          </div>
          <div className="text-lg">
            Accuracy: {((Math.floor(score / 10) / quizData.length) * 100).toFixed(1)}%
          </div>
        </div>

        <button
           onClick={() => navigate('/quiz')}
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
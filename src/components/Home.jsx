import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">
          🎮 Quiz Challenge
        </h1>
        <button
          onClick={() => navigate('/quiz')}
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg 
                   transition-all duration-300 transform hover:scale-105"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
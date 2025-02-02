import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const QuizContext = createContext();
export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.PROD 
          ? '/api/proxy'  // Vercel Serverless Function
          : '/api';       // Local Vite Proxy

        const { data } = await axios.get(apiUrl);
        
        // Handle both proxy and direct responses
        const questions = data?.questions || data;
        
        if (!Array.isArray(questions)) {
          throw new Error('Invalid data format');
        }
        
        setQuizData(questions);
      } catch (err) {
        setError(err.message || 'Failed to load quiz data');
        console.error('API Error:', {
          message: err.message,
          url: err.config?.url,
          response: err.response?.data
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <QuizContext.Provider value={{
      quizData,
      currentQuestion,
      setCurrentQuestion,
      score,
      setScore,
      streak,
      setStreak,
      isLoading,
      error
    }}>
      {children}
    </QuizContext.Provider>
  );
};


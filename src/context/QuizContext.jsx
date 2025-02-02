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
        // Use environment-aware URL
        const apiUrl = import.meta.env.PROD 
          ? 'https://api.jsonserve.com/Uw5CrX' 
          : '/api';

        const { data } = await axios.get(apiUrl);
        
        // Handle different response formats
        const questions = Array.isArray(data) ? data : data?.questions || [];
        
        if (!questions.length) {
          throw new Error('No questions found');
        }
        
        setQuizData(questions);
      } catch (err) {
        setError(err.message || 'Failed to load quiz data');
        console.error('API Error:', {
          message: err.message,
          response: err.response?.data,
          config: err.config
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


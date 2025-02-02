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
      setIsLoading(true); // Start loading
      try {
        const { data } = await axios.get('https://api.jsonserve.com/Uw5CrX');
        // console.log(data); // Check the structure of the response
        if (!data || !Array.isArray(data.questions)) {
          throw new Error('Invalid data format');
        }
        setQuizData(data.questions);
      } catch (err) {
        setError('Failed to load quiz data');
        // console.error(err); // Log the error for debugging
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
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



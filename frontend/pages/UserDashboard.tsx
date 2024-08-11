import { useEffect, useState } from 'react';
import UserFlashCard from '../components/UserFlashCard';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners'; // Example of a loader

export type Card = {
  content: string;
  answer: string;
};

const UserDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardTransition, setCardTransition] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/bulk`)
      .then(response => {
        setAllCards(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching cards:", error);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    setCardTransition(true);
    setTimeout(() => {
      setCurrentIndex(prevIndex => Math.min(prevIndex + 1, allCards.length - 1));
      setCardTransition(false);
    }, 300);
  };

  const handlePrevious = () => {
    setCardTransition(true);
    setTimeout(() => {
      setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
      setCardTransition(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 gap-8 bg-gray-100 text-gray-800">
      {loading ? (
        <ClipLoader size={50} color="#4A90E2" loading={loading} />
      ) : (
        <div className="flex items-center gap-8">
          <button
            className="p-3 bg-gray-300 text-gray-800 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <FiChevronLeft size={24} />
          </button>
          
          <div className="flex justify-center items-center w-64 h-80">
            {cardTransition ? (
              <ClipLoader size={30} color="#4A90E2" loading={cardTransition} />
            ) : (
              <UserFlashCard
                content={allCards[currentIndex]?.content || ''}
                answer={allCards[currentIndex]?.answer || ''}
              />
            )}
          </div>

          <button
            className="p-3 bg-gray-300 text-gray-800 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
            onClick={handleNext}
            disabled={currentIndex === allCards.length - 1}
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

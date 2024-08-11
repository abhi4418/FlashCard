import { useState } from 'react';

type CardProps = {
  content: string;
  answer: string;
};

const UserFlashCard = ({ content, answer }: CardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div
      className="w-64 h-80 bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 flex flex-col items-center justify-center p-4 cursor-pointer rounded-xl shadow-xl transition-transform transform hover:scale-105 overflow-hidden"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center h-full w-full p-2 rounded-xl overflow-hidden">
        <div className="text-lg text-gray-800 text-center font-semibold mb-2">
          {showAnswer ? 'Answer' : 'Question'}
        </div>
        <div
          className={`text-lg text-gray-800 text-center overflow-auto no-scrollbar max-h-full ${showAnswer ? 'font-normal' : 'font-bold'}`}
        >
          {showAnswer ? answer : content}
        </div>
      </div>
    </div>
  );
};

export default UserFlashCard;

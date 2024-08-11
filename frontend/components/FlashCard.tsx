import { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const FlashCard = ({ content: initialContent, answer: initialAnswer, id, allFlashCards, setAllFlashCards }: any) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [answer, setAnswer] = useState(initialAnswer);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete/${id}`);
      setAllFlashCards(allFlashCards.filter((flashcard: any) => flashcard.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSave = async (newContent: string, newAnswer: string) => {
    try {
      await axios.put(`http://localhost:3000/admin/update/${id}`, { content: newContent, answer: newAnswer });
      setContent(newContent);
      setAnswer(newAnswer);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  return (
    <div className="relative flex flex-col bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto transform transition-transform duration-300 hover:scale-105 z-10">
      <div className="text-xl font-semibold mb-4">
        {isFlipped ? answer : content}
      </div>
      <div className="flex gap-2 justify-between mt-4">
        <button 
          onClick={handleEdit} 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-600 w-full"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="bg-red-500 text-white py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-red-600 w-full"
        >
          Delete
        </button>
        <button 
          onClick={flipCard} 
          className="bg-gray-500 text-white py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-600 w-full"
        >
          {isFlipped ? 'Question' : 'Answer'}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialContent={content}
        initialAnswer={answer}
      />
    </div>
  );
};

export default FlashCard;

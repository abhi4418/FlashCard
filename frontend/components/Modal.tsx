import { useState } from 'react';

const Modal = ({ isOpen, onClose, onSave, initialContent, initialAnswer }: any) => {
  const [newContent, setNewContent] = useState(initialContent);
  const [newAnswer, setNewAnswer] = useState(initialAnswer);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(newContent, newAnswer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Flashcard</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Answer</label>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

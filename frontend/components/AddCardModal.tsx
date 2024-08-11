import { useState } from "react";

type ModalProps = {
    show: boolean;
    onClose: () => void;
    onSave: (content: string, answer: string) => void;
    initialContent: string;
    initialAnswer: string;
};

const AddCardModal = ({ show, onClose, onSave, initialContent, initialAnswer }: ModalProps) => {
    const [content, setContent] = useState(initialContent);
    const [answer, setAnswer] = useState(initialAnswer);

    if (!show) {
        return null; // Don't render anything if the modal should not be shown
    }

    const handleSave = () => {
        onSave(content, answer);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto">
                <h2 className="text-xl mb-4">Add New Flashcard</h2>
                <div className="mb-4">
                    <label className="block mb-2">Content:</label>
                    <textarea
                        className="w-full p-2 border rounded resize-none max-h-32 overflow-auto"
                        rows={3}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Answer:</label>
                    <textarea
                        className="w-full p-2 border rounded resize-none max-h-32 overflow-auto"
                        rows={3}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddCardModal;

import { useState, useEffect } from "react";
import FlashCard from "../components/FlashCard";
import AddCardModal from "../components/AddCardModal"; // Make sure this imports correctly
import axios from "axios";

const AdminDashboard = () => {
    const [allFlashCards, setAllFlashCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalAnswer, setModalAnswer] = useState("");

    useEffect(() => {
        fetchFlashCards();
    }, []);

    const fetchFlashCards = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/bulk');
            setAllFlashCards(response.data);
        } catch (error) {
            console.error("Error fetching flashcards:", error);
        }
    };

    const handleSaveFlashCard = async (newContent: string, newAnswer: string) => {
        try {
            await axios.post('http://localhost:3000/admin/addFlashcard', { content: newContent, answer: newAnswer });
            fetchFlashCards(); // Refresh the flashcards list
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error("Error adding flashcard:", error);
        }
    };

    return (
        <>
            <div className="relative w-screen h-screen flex justify-center items-center">
                {/* Add New Flashcard Button */}
                <button
                    className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setShowModal(true)}
                >
                    Add New Flashcard
                </button>

                <div className="flex gap-4 flex-wrap">
                    {allFlashCards.map((flashcard : any) => (
                        <FlashCard 
                            key={flashcard.id} 
                            content={flashcard.content} 
                            answer={flashcard.answer} 
                            id={flashcard.id} 
                            setAllFlashCards = {setAllFlashCards}
                            allFlashCards = {allFlashCards}
                        />
                    ))}
                </div>
            </div>

            {/* Modal for adding a new flashcard */}
            <AddCardModal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                onSave={handleSaveFlashCard}
                initialContent={modalContent}
                initialAnswer={modalAnswer}
            />
        </>
    );
};

export default AdminDashboard;
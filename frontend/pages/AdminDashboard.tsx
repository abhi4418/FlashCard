import { useState, useEffect } from "react";
import FlashCard from "../components/FlashCard";
import AddCardModal from "../components/AddCardModal";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const AdminDashboard = () => {
    const [allFlashCards, setAllFlashCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    //@ts-ignore
    const [modalContent, setModalContent] = useState("");
    //@ts-ignore
    const [modalAnswer, setModalAnswer] = useState("");

    const [loading , setLoading] = useState(true) ;

    useEffect(() => {
        fetchFlashCards();
    }, []);

    const fetchFlashCards = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/bulk`);
            setAllFlashCards(response.data);
            setLoading(false) ;
        } catch (error) {
            console.error("Error fetching flashcards:", error);
            setLoading(false) ;
        }
    };

    const handleSaveFlashCard = async (newContent: string, newAnswer: string) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/addFlashcard`, { content: newContent, answer: newAnswer });
            fetchFlashCards(); // Refresh the flashcards list
            setShowModal(false); // Close the modal
            setLoading(false) ;
        } catch (error) {
            console.error("Error adding flashcard:", error);
            setLoading(false) ;
        }
    };

    
    if(loading){
        return <div className="h-screen w-screen flex justify-center items-center">
            <ClipLoader size={50} color="#4A90E2" loading={loading} />
        </div>
    }
    else {
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
}
};

export default AdminDashboard;
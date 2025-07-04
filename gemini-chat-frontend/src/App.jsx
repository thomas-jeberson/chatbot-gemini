import {useState} from 'react'
import './App.css'
import ChatInput from "./components/ChatInput.jsx";
import ChatResponse from "./components/ChatResponse.jsx";
import {fetchChatResponse} from "./services/api.jsx";

function App() {
    const [response, setRespose] = useState("");
    const [loading, setLoading] = useState(false);
    const handleQuestionSubmit = async (question) => {
        setLoading(true);
        setRespose(null);
        try{
            const apiResponse=await fetchChatResponse(question);
            setRespose(apiResponse);
        }catch(e){
            alert("failed to get response");
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className='App'>
            <header className='bg-primary text-white text-center py-4'>
                <h1>GEMINI CHATBOT</h1>
            </header>
            <ChatInput onSubmit={handleQuestionSubmit}/>
            <ChatResponse response={response}/>
        </div>
)
}

export default App

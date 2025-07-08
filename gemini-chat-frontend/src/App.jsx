import {useEffect, useState} from 'react'
import './App.css'
import ChatInput from "./components/ChatInput.jsx";
import ChatResponse from "./components/ChatResponse.jsx";
import {fetchChatResponse} from "./services/api.jsx";
import {v4 as uuidv4} from "uuid";


function App() {
    const [sessionId,setSessionId] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const newSesionId = uuidv4();
        setSessionId(newSesionId);
        console.log("Session ID: ", newSesionId);
    }, []);

    const handleQuestionSubmit = async (question) => {
        if(!question?.trim()) return;
        setLoading(true);
        setResponse({});
        try{
            const apiResponse=await fetchChatResponse(question,sessionId);
            console.log("apiResponse: ",apiResponse);
            setResponse(apiResponse);
        }catch(e){
            console.log("Failed to get response",e);
            alert("failed to get response");
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className='App'>
            <header className='bg-primary text-white text-center py-4'>
                <h1>THOMAS'S CHATBOT</h1>
            </header>
            <ChatInput onSubmit={handleQuestionSubmit}/>
            <ChatResponse response={response}/>
        </div>
    )
}

export default App
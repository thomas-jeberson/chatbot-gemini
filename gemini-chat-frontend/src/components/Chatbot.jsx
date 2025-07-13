import {useEffect, useRef, useState} from 'react';
import {fetchChatResponse} from '../services/api';
import {v4 as uuidv4} from 'uuid';
import {FiSend} from 'react-icons/fi';
import {useNavigate} from "react-router-dom";

export default function Chatbot() {
    const [sessionId, setSessionId] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const chatHistoryRef = useRef(null);

    useEffect(() => {
        if (chatHistoryRef.current) {
            chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const id = uuidv4();
        setSessionId(id);
        const savedMessages = localStorage.getItem(`chat_${id}`);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        if (sessionId) {
            localStorage.setItem(`chat_${sessionId}`, JSON.stringify(messages));
        }
    }, [messages, sessionId]);

    const handleQuestionSubmit = async () => {
        const question = input.trim();
        if (!question) return;
        setInput('');
        const userMsg = {sender: 'user', text: question};
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);

        try {
            const apiResponse = await fetchChatResponse(question, sessionId);
            let botResponse = 'No reply';
            if (apiResponse.candidates && apiResponse.candidates[0]?.content?.parts) {
                botResponse = apiResponse.candidates[0].content.parts[0].text;
            } else if (apiResponse.answer) {
                botResponse = apiResponse.answer;
            }
            const botMsg = {sender: 'bot', text: botResponse};
            setMessages((prev) => [...prev, botMsg]);
        } catch (e) {
            console.error('API Error:', e);
            setMessages((prev) => [
                ...prev,
                {sender: 'bot', text: 'Sorry, I encountered an error. Please try again.'}
            ]);
        } finally {
            setLoading(false);
        }
    };

    const formatMessage = (text) => {
        if (typeof text !== 'string') return text;
        const codeBlockRegex = /```(\w*)\n([\s\S]*?)\n```/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            const language = match[1] || '';
            const code = match[2].trim();
            parts.push(
                <pre key={match.index} className="code-block">
                    {language && <span className="code-language">{language}</span>}
                    <code>{code}</code>
                    <button
                        className="copy-button"
                        onClick={() => navigator.clipboard.writeText(code)}
                    >
                        Copy
                    </button>
                </pre>
            );
            lastIndex = match.index + match[0].length;
        }
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }
        return parts.length ? parts : text;
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // ✅ Uses React Router navigation
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-wrapper">
                <header className="chatbot-header">
                    <h1>THOMAS'S CHATBOT</h1>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </header>
                <main className="chatbot-body">
                    <div className="chat-history" ref={chatHistoryRef}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
                            >
                                {formatMessage(msg.text)}
                            </div>
                        ))}
                        {loading && <div className="chat-bubble bot">Typing...</div>}
                    </div>
                </main>
                <div className="input-container">
  <textarea
      className="input-field"
      placeholder="Type your message..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleQuestionSubmit();
          }
      }}
  />
                    <button className="send-button" onClick={handleQuestionSubmit}>
                        <FiSend className="send-icon"/>
                    </button>
                </div>
            </div>

            <style>{`
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .chatbot-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    height: 100vh;
    background: radial-gradient(circle at top left, #1c1c2e, #0f0f14);
}

@supports (height: 100dvh) {
    .chatbot-container {
        height: 100dvh;
    }

    .chatbot-wrapper {
        height: 100dvh;
    }
}


.chatbot-wrapper {
    width: 100%;
    max-width: 600px;
    background: #1e1e2f;
    color: #eee;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    position: relative;
}

    .chatbot-header {
        padding: 15px 20px;
        background: linear-gradient(to right, #5a189a, #3c096c);
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap; /* ✅ Ensure single line */
        gap: 10px;
        min-height: 60px;
    }

    .chatbot-header h1 {
        margin: 0;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .logout-btn {
        background-color: #7b2cbf;
        color: white;
        border: none;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .logout-btn:hover {
        background-color: #5a189a;
    }

    .chatbot-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 15px;
        overflow-y: hidden;
    }

    .chat-history {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        scrollbar-width: thin;
    }

    .chat-bubble {
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 15px;
        font-size: 14px;
        line-height: 1.4;
        word-wrap: break-word;
    }

    .chat-bubble.user {
        background-color: #4c1d95;
        color: #fff;
        align-self: flex-end;
        border-bottom-right-radius: 0;
    }

    .chat-bubble.bot {
        background-color: #2e2e3f;
        color: #e2e2e2;
        align-self: flex-start;
        border-bottom-left-radius: 0;
    }

    .input-container {
        padding: 10px 12px;
        background-color: #14141f;
        border-top: 1px solid #222;
        display: flex;
        align-items: center;
        gap: 8px;
        min-height: 60px;
    }

    .input-field {
        flex: 1;
        resize: none;
        padding: 12px 16px;
        border: none;
        outline: none;
        border-radius: 20px;
        font-size: 14px;
        height: 40px;
        background-color: #222;
        color: #fff;
        max-height: 100px;
        overflow-y: auto;
        line-height: 1.5;
    }

    .input-field::-webkit-scrollbar {
        display: none;
    }

    .input-field {
        scrollbar-width: thin;
        scrollbar-color: #444 transparent;
    }

    .send-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .send-icon {
        font-size: 22px;
        color: #9f7aea;
    }
`}</style>


        </div>
    );
}

import axios from "axios";

const API_URL = "http://localhost:8080/api/qna/ask";

export const fetchChatResponse = async (question, sessionId) => {
    try {
        const response = await axios.post(API_URL, {
            question: question,
            sessionId: sessionId // 🟡 Pass sessionId from frontend
        });
        return response.data;
    } catch (e) {
        console.error("❌ Error while fetching chat response:", e);
        throw e;
    }
};

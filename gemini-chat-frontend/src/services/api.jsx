import axiosInstance from "./axiosInstance";

const API_ENDPOINT = "/qna/ask";

export const fetchChatResponse = async (question, sessionId) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINT, {
            question,
            sessionId
        });
        return response.data;
    } catch (e) {
        console.error("❌ Error while fetching chat response:", e);
        throw e;
    }
};

import { useDispatch, useSelector } from "react-redux";
import { addMessage, setLoading, setUserMessage } from "../../redux/slice/chatbotSlice";
import axios from 'axios';

const Chatbot = () => {
  const dispatch = useDispatch();
  const { messages, userMessage, loading } = useSelector((state) => state.chatbot);

  const sendMessage = async () => {
    if (userMessage.trim() === "") return;

    dispatch(addMessage({ sender: "user", text: userMessage }));
    dispatch(setUserMessage(""));
    dispatch(setLoading(true));

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: userMessage,
      });

      dispatch(addMessage({ sender: "bot", text: response.data.reply }));
    } catch (error) {
      console.error("Error sending message:", error);
      dispatch(addMessage({ sender: "bot", text: "Sorry, something went wrong!" }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-4 rounded-lg shadow-md">
      <div className="h-80 overflow-y-scroll p-2 mb-4 bg-gray-50 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200"
            } p-2 rounded-lg mb-2`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-200 p-2 rounded-lg mb-2 text-center">...</div>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => dispatch(setUserMessage(e.target.value))}
          className="flex-1 p-2 border rounded-l-lg border-gray-300"
          placeholder="Ask about Z. H. Sikder University..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

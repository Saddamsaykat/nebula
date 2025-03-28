import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useGenerateChatResponseMutation } from "../../../redux/slice/chatApi/chatApi";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../../utils/themeStyles/themeStyles";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [generateChatResponse, { isLoading }] =
    useGenerateChatResponseMutation();

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  async function handleGenerateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const currentQuestion = question;
    setQuestion("");
    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      const response = await generateChatResponse(currentQuestion).unwrap();
      const aiResponse =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry - Something went wrong. Please try again!";

      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: aiResponse },
      ]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "answer",
          content: "Sorry - Something went wrong. Please try again!",
        },
      ]);
    }
  }

  const theme = useSelector((state) => state.theme.theme);
  const styles = getThemeStyles(theme);

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <IoChatbubbleEllipsesSharp size={24} />
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div
          style={styles}
          className="fixed z-50 bottom-16 right-6 w-80 bg-white shadow-xl rounded-lg overflow-hidden flex flex-col"
        >
          <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">ZHSUST AI</h1>
            <button onClick={() => setIsOpen(false)} className="text-white">
              <IoClose size={20} />
            </button>
          </header>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 hide-scrollbar"
          >
            {chatHistory.length === 0 ? (
              <div className="h-[250px] flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-lg font-bold text-blue-600 mb-2">
                  Welcome to ZHSUST 👋
                </h2>
                <p className="text-gray-600">Ask me anything! About ZHSUST</p>
              </div>
            ) : (
              chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    chat.type === "question" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-2 rounded-lg ${
                      chat.type === "question"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="text-left">
                <div className="p-2 rounded-lg animate-pulse flex items-center gap-2">
                  <RiRobot3Fill /> Thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleGenerateAnswer} className="p-3 border-t">
            <div className="flex gap-2">
              <textarea
                required
                className="flex-1 border border-gray-300 rounded p-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything..."
                rows="2"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerateAnswer(e);
                  }
                }}
              ></textarea>
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

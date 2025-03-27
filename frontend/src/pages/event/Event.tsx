import React, { useState } from "react";
import { useSendMessageMutation } from "../../redux/slice/chatApi/chatApi";

const Event = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [sendMessage, { isLoading, isError, data }] = useSendMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userMessage) return;

    // Display the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
    ]);

    try {
      // Send user message to the backend using RTK Query
      const response = await sendMessage(userMessage).unwrap();

      // Display the bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response.botResponse },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 max-w-xl mx-auto rounded-lg shadow-lg">
      <div className="chat-window w-full p-4 border border-gray-300 rounded-lg">
        <div className="messages space-y-3 overflow-y-auto h-72">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <p
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-4 space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
        {isError && (
          <p className="mt-2 text-red-500 text-sm">
            {data?.error || 'An error occurred. Please try again.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Event;

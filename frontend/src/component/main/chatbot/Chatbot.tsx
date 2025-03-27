import React, { useState } from 'react';
import { useSendMessageMutation } from '../../../redux/slice/chatApi/chatApi';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [postText, { data, isLoading, error }] = useSendMessageMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            await postText(message);
            setMessage('');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Send
                </button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {data && <p className="text-green-500">Response: {data}</p>}
        </div>
    );
};

export default Chatbot;

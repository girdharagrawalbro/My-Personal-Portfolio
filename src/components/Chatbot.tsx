'use client';
import React, { useState } from 'react';
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDo0eD4kH-FMGIa6mrr29TodxlqB5RFfzk'; // Replace with your actual Gemini API key

const Chatbot = () => {
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    contents: [
                        {
                            role: 'user',
                            parts: [{ text: input }],
                        },
                    ],
                }
            );

            const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
            setMessages((prev) => [...prev, { role: 'model', content: botReply }]);
        } catch (err) {
            setMessages((prev) => [...prev, { role: 'model', content: 'Error getting response' }]);
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="">
                {isOpen ?
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full p-2 bg-blue-600 text-white font-bold text-left"
                    >
                        💬 Gemini Chatbot (Click to Hide)
                    </button> :
                    <div className="loader">
                        <div className="modelViewPort">
                            <div className="eva">
                                <div className="head">
                                    <div className="eyeChamber">
                                        <div className="eye"></div>
                                        <div className="eye"></div>
                                    </div>
                                </div>
                                <div className="body">
                                    <div className="hand"></div>
                                    <div className="hand"></div>
                                    <div className="scannerThing"></div>
                                    <div className="scannerOrigin"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }


                {isOpen && (
                    <div className="flex flex-col h-96 p-3">
                        <div className="flex-1 overflow-y-auto p-2 bg-gray-50 text-sm">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`mb-2 p-2 rounded ${msg.role === 'user'
                                        ? 'bg-blue-100 text-right'
                                        : 'bg-green-100 text-left'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            ))}
                            {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
                        </div>

                        <div className="p-2 border-t flex items-center bg-white">
                            <input
                                type="text"
                                className="flex-1 px-2 py-1 border rounded mr-2 text-sm"
                                placeholder="Ask something..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm p-3"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;

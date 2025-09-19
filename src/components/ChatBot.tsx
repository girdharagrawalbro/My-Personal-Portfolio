import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatBotProps {
  projects: any[];
  onFilterChange: (filter: string) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ projects, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string, sender: 'user' | 'bot' }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleLocalCommand = (command: string): boolean => {
    const lowerCaseCommand = command.toLowerCase();

    // Command to filter projects
    const filterMatch = lowerCaseCommand.match(/show me (.*) projects/);
    if (filterMatch && filterMatch[1]) {
      const category = filterMatch[1].trim();
      const validCategories = ['all', 'frontend', 'backend', 'fullstack'];
      if (validCategories.includes(category)) {
        onFilterChange(category);
        setMessages(prev => [...prev, { text: `Sure, here are the ${category} projects.`, sender: 'bot' }]);
        return true;
      }
    }

    // Command to get project details
    const detailsMatch = lowerCaseCommand.match(/tell me more about (.*)/);
    if (detailsMatch && detailsMatch[1]) {
      const projectName = detailsMatch[1].trim().toLowerCase();
      const project = projects.find(p => p.title.toLowerCase().includes(projectName));
      if (project) {
        const projectInfo = `
          **${project.title}**: ${project.description}
          It's a ${project.category} project.
          Tags: ${project.tags.join(', ')}.
          You can view it live [here](${project.url}) or check out the code [on GitHub](${project.github}).
        `;
        setMessages(prev => [...prev, { text: projectInfo, sender: 'bot' }]);
        return true;
      }
    }
    
    if (lowerCaseCommand.includes('best project')) {
        setMessages(prev => [...prev, { text: "Girdhar is particularly proud of 'TalkEasy (Voice Agent)'. It's a voice-enabled conversational assistant built with FastAPI, Murf TTS, AssemblyAI STT, and Gemini LLM.", sender: 'bot' }]);
        return true;
    }

    return false;
  };


  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);

    if (handleLocalCommand(userMessage)) {
      setIsTyping(false);
      return;
    }


    try {
      // Get the Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const portfolioContext = `You are an expert portfolio assistant for Girdhar Agrawal. Here is his project list: ${JSON.stringify(projects.map(p => ({ title: p.title, description: p.description, category: p.category, tags: p.tags })))}. Be helpful and enthusiastic.`;
      const fullPrompt = `${portfolioContext}\n\nUser question: "${userMessage}"`;


      // Generate response
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      // Add bot message
      setMessages(prev => [...prev, { text, sender: 'bot' }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I encountered an error. Please try again later.",
        sender: 'bot'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Floating Robot Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chatbot"
      >
        <FaRobot className="text-2xl" />
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute bottom-20 right-0 w-80 h-96 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-indigo-600/90 p-3 rounded-t-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaRobot className="text-white" />
                <span className="text-white font-medium">Portfolio Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
                  <p className="mb-4">Ask me about Girdhar's portfolio!</p>
                  <div className='text-left text-sm'>
                    <p className='font-bold'>Try these commands:</p>
                    <ul className='list-disc list-inside'>
                        <li>Show me frontend projects</li>
                        <li>Tell me more about TalkEasy</li>
                        <li>What is his best project?</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-gray-700 text-gray-200 rounded-tl-none'}`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-700 text-gray-200 p-3 rounded-lg rounded-tl-none">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
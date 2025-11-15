import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createGeminiChat, streamChatMessage } from '../services/geminiService';
import { GenerateContentResponse, Chat } from "@google/genai";
import { GEMINI_ASSISTANT_SYSTEM_INSTRUCTION_FLASH, GEMINI_ASSISTANT_SYSTEM_INSTRUCTION_PRO } from '../constants';

const markdownToHtml = (markdown: string): string => {
  // A simple markdown to HTML converter for basic formatting (bold, italics, newlines).
  // For production, consider a dedicated library like 'marked' or 'react-markdown'.
  let html = markdown
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>')     // Italic
    .replace(/```(.*?)```/gs, '<pre class="bg-gray-100 p-2 rounded-md overflow-x-auto my-2"><code>$1</code></pre>') // Code blocks
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>') // Inline code
    .replace(/\n/g, '<br/>'); // Newlines
  return html;
};

export const GeminiAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const flashChatRef = useRef<Chat | null>(null);
  const proChatRef = useRef<Chat | null>(null);

  const initializeChats = useCallback(() => {
    try {
      flashChatRef.current = createGeminiChat('gemini-2.5-flash', GEMINI_ASSISTANT_SYSTEM_INSTRUCTION_FLASH);
      proChatRef.current = createGeminiChat('gemini-2.5-pro', GEMINI_ASSISTANT_SYSTEM_INSTRUCTION_PRO);
    } catch (e: any) {
      setError(e.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  useEffect(() => {
    initializeChats();
  }, [initializeChats]);

  const handleSendMessage = async (modelType: 'flash' | 'pro') => {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }
    setLoading(true);
    setResponse('');
    setError(null);

    const chatInstance = modelType === 'flash' ? flashChatRef.current : proChatRef.current;

    if (!chatInstance) {
      setError(`Gemini chat for ${modelType} model is not initialized. Please ensure API_KEY is set.`);
      setLoading(false);
      return;
    }

    let accumulatedResponse = '';
    const onChunk = (chunk: GenerateContentResponse) => {
      setResponse(prev => {
        const newText = prev + (chunk.text || '');
        accumulatedResponse = newText; // Keep track of the full response during streaming
        return newText;
      });
    };

    try {
      await streamChatMessage(chatInstance, prompt, onChunk);
    } catch (e: any) {
      setError(`Failed to get response: ${e.message}`);
      setResponse(''); // Clear any partial response on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">AI Assistant (Powered by Gemini)</h2>
      <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-8">
        Harness the power of AI to analyze text rapidly (Flash) or generate creative, detailed content (Pro).
      </p>

      <div className="mb-6">
        <label htmlFor="prompt-input" className="block text-lg font-medium text-gray-800 mb-2">
          Your Prompt:
        </label>
        <textarea
          id="prompt-input"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 h-32 resize-y"
          placeholder="Enter your text for analysis or prompt for content generation..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          aria-label="AI assistant prompt input"
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
        <button
          onClick={() => handleSendMessage('flash')}
          disabled={loading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 2v-6m2 9H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2.586a1 1 0 01-.707-.293l-5.414-5.414a1 1 0 01-.293-.707V17z"></path></svg>
              Analyze Text (Flash)
            </>
          )}
        </button>
        <button
          onClick={() => handleSendMessage('pro')}
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Generate Content (Pro)
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {response && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Gemini's Response:</h3>
          <div
            className="prose prose-indigo max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(response) }}
          />
        </div>
      )}
    </div>
  );
};
'use client';

import { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Message } from '@/app/components/Message';
import { ChatInput } from '@/app/components/ChatInput';
import {
  PsychoanalyticTheme,
  Question,
  QUESTIONS,
  THEME_DESCRIPTIONS,
  generateDiagnosis,
  getNextQuestion,
} from '@/app/lib/psychoanalysis';

const INTRODUCTION = `Welcome to the chamber of echoes, where the walls whisper in forgotten tongues. 
Here, we do not ask questions—we listen to the silence between your words. 
The answers you seek are already written in the shadows of your mind. 
We are merely the mirror that reflects them back to you.

This is an excavation of the psyche.
Each response you give is a brushstroke on the canvas of your unconscious.
The deeper you go, the more the questions will find you.

Are you ready to meet what waits in the dark?`;

export default function ChatPage() {
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(QUESTIONS);
  const [themeResponses, setThemeResponses] = useState<
    Record<PsychoanalyticTheme, string[]>
  >({
    repression: [],
    deathDrive: [],
    mirrorStage: [],
    uncanny: [],
    fragmentation: [],
  });
  const [finalDiagnosis, setFinalDiagnosis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: '/api/chat',
    body: {
      currentQuestion: QUESTIONS[currentQuestionIndex],
      themeResponses,
    },
    onError: (error) => {
      console.error('Chat error:', error);
      setError('Failed to connect to the psychoanalyst. Please try again.');
    },
  });

  const resetChat = () => {
    try {
      // Clear all state
      setCurrentQuestionIndex(0);
      setThemeResponses({
        repression: [],
        deathDrive: [],
        mirrorStage: [],
        uncanny: [],
        fragmentation: [],
      });
      setFinalDiagnosis(null);
      setMessages([]);
      setError(null);

      // Clear localStorage
      localStorage.removeItem('chatMessages');
      localStorage.removeItem('themeResponses');
      localStorage.removeItem('currentQuestionIndex');
      localStorage.removeItem('finalDiagnosis');
    } catch (error) {
      console.error('Error resetting chat:', error);
      setError('Failed to reset the session. Please refresh the page.');
    }
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('chatMessages');
      const savedThemeResponses = localStorage.getItem('themeResponses');
      const savedQuestionIndex = localStorage.getItem('currentQuestionIndex');
      const savedDiagnosis = localStorage.getItem('finalDiagnosis');

      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
      if (savedThemeResponses) {
        setThemeResponses(JSON.parse(savedThemeResponses));
      }
      if (savedQuestionIndex) {
        setCurrentQuestionIndex(parseInt(savedQuestionIndex));
      }
      if (savedDiagnosis) {
        setFinalDiagnosis(savedDiagnosis);
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
      setError('Failed to load your previous session. Starting a new one.');
    }
  }, [setMessages]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
      localStorage.setItem('themeResponses', JSON.stringify(themeResponses));
      localStorage.setItem(
        'currentQuestionIndex',
        currentQuestionIndex.toString()
      );
      if (finalDiagnosis) {
        localStorage.setItem('finalDiagnosis', finalDiagnosis);
      }
    } catch (error) {
      console.error('Error saving state:', error);
      setError('Failed to save your progress. Your session may not persist.');
    }
  }, [messages, themeResponses, currentQuestionIndex, finalDiagnosis]);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      // Add the current response to the theme tracking
      const currentTheme = QUESTIONS[currentQuestionIndex].theme;
      setThemeResponses((prev) => ({
        ...prev,
        [currentTheme]: [...prev[currentTheme], input],
      }));

      // Get the next question based on the current response
      const nextQuestion = getNextQuestion(currentTheme, input, themeResponses);

      if (nextQuestion) {
        // Update the questions array with the new dynamic question
        setQuestions((prev) => {
          const newQuestions = [...prev];
          newQuestions[currentQuestionIndex + 1] = nextQuestion;
          return newQuestions;
        });
      }

      // Move to next question or generate final diagnosis
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Find the dominant theme based on response length
        const dominantTheme = Object.entries(themeResponses).reduce((a, b) =>
          a[1].length > b[1].length ? a : b
        )[0] as PsychoanalyticTheme;

        const diagnosis = generateDiagnosis(
          dominantTheme,
          themeResponses[dominantTheme]
        );
        setFinalDiagnosis(diagnosis);
      }

      handleSubmit(e);
    } catch (error) {
      console.error('Error submitting message:', error);
      setError('Failed to process your response. Please try again.');
    }
  };

  const handleStartChat = () => {
    setShowIntroduction(false);
  };

  if (showIntroduction) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-gray-100">
        <div className="max-w-2xl space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            The Echo Chamber
          </h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {INTRODUCTION}
            </p>
          </div>
          <button
            onClick={handleStartChat}
            className="w-full px-6 py-3 mt-8 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Enter the Chamber
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={resetChat}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reset Session
        </button>
      </div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
          {error}
        </div>
      )}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {finalDiagnosis && (
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Your Psychoanalytic Diagnosis
              </h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {finalDiagnosis}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t">
        {currentQuestionIndex < QUESTIONS.length ? (
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-lg font-medium mb-2">
              Question {currentQuestionIndex + 1} of {QUESTIONS.length}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {QUESTIONS[currentQuestionIndex].text}
            </p>
          </div>
        ) : (
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-lg font-medium">Session Complete</p>
            <p className="text-gray-700 dark:text-gray-300">
              Your psychoanalytic profile has been prepared.
            </p>
          </div>
        )}

        {currentQuestionIndex < QUESTIONS.length && (
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleMessageSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

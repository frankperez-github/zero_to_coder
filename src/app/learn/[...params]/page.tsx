'use client'

import { useState, useEffect } from 'react';
import { questions } from '@/lib/questions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    params: string[];
  };
}

const LearnPage = ({ params }: Props) => {
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [initialQuestions, setInitialQuestions] = useState(questions.filter(q => q.difficulty === 'easy'));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  // Get filter params (type, topic, difficulty)
  const [type, topic, difficulty] = params.params;

  // Filter questions based on type, topic, and difficulty params
  let filtered = questions;

  if (type) {
    filtered = filtered.filter((q) => q.type === type);
  }

  if (topic) {
    filtered = filtered.filter((q) => q.topic === topic);
  }

  if (difficulty) {
    filtered = filtered.filter((q) => q.difficulty === difficulty);
  }


  // Filter the questions based on the current difficulty
  const easyQuestions = filtered.filter(q => q.difficulty === 'easy');
  const mediumQuestions = filtered.filter(q => q.difficulty === 'medium');
  const hardQuestions = filtered.filter(q => q.difficulty === 'hard');

  // Effect to update questions based on difficulty
  useEffect(() => {
    if (difficulty) {
      // If difficulty is provided, use it directly
      setCurrentDifficulty(difficulty as 'easy' | 'medium' | 'hard');
      setInitialQuestions(filtered);
    } else {
      // Otherwise, set initial questions based on available difficulty levels
      if (easyQuestions.length > 0) {
        setCurrentDifficulty('easy');
        setInitialQuestions(easyQuestions);
      } else if (mediumQuestions.length > 0) {
        setCurrentDifficulty('medium');
        setInitialQuestions(mediumQuestions);
      } else if (hardQuestions.length > 0) {
        setCurrentDifficulty('hard');
        setInitialQuestions(hardQuestions);
      }
    }
  }, [filtered, difficulty]); // Only run when filtered or difficulty changes

  const handleAnswerSelected = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswered(true);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < initialQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      // If we reach the end of the current difficulty, move to the next level of difficulty if no difficulty param is provided
      if (!difficulty) {
        if (currentDifficulty === 'easy' && mediumQuestions.length > 0) {
          setCurrentDifficulty('medium');
          setInitialQuestions(mediumQuestions);
          setCurrentQuestionIndex(0);
        } else if (currentDifficulty === 'medium' && hardQuestions.length > 0) {
          setCurrentDifficulty('hard');
          setInitialQuestions(hardQuestions);
          setCurrentQuestionIndex(0);
        }
      }
    }
  };

  const currentQuestion = initialQuestions[currentQuestionIndex];

  return (
    <div className="container min-h-[100vh] p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-bold text-center mb-6">Learn Page</h1>
      <p className="text-xl mb-4 text-center">
        In this section, you can practice and improve your skills. Answer the following questions and get immediate feedback.
      </p>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Question {currentQuestionIndex + 1}:</h2>
        <p className="text-lg">{currentQuestion.question}</p>
      </div>

      <div className="mb-6">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelected(option)}
            className={`w-full p-3 mb-2 rounded-md text-lg font-semibold ${
              selectedAnswer === option ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {answered && (
        <div className="mb-4">
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <p className="text-green-600">Correct! Well done.</p>
          ) : (
            <p className="text-red-600">Incorrect. The correct answer is: {currentQuestion.correctAnswer}</p>
          )}
          <div className="mt-4">
            <p className="text-sm text-white">{currentQuestion.explanation}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={goToNextQuestion}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
          disabled={!answered}
        >
          Next Question
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/learn/resources"
          className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-md transition duration-300"
        >
          Explore More Resources
        </Link>
      </div>
    </div>
  );
};

export default LearnPage;

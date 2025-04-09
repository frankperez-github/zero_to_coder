'use client'

import { useState } from 'react';
import { questions } from '../../lib/questions';
import { Question } from '@/lib/questions';
import Link from 'next/link';
import QuestionComp from '@/components/Question';

const ResultsPage = ({ logicScore, syntaxScore }: { logicScore: number; syntaxScore: number }) => {
  const logicQuestionsCount = questions.filter((q) => q.type === 'logic').length;
  const syntaxQuestionsCount = questions.filter((q) => q.type === 'syntax').length;

  // Calcular la retroalimentación y sugerencias basadas en la puntuación
  const getFeedback = (score: number, total: number, type: 'Logic' | 'Syntax') => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) {
      return `You have a strong understanding of ${type} logic!`;
    } else if (percentage >= 50) {
      return `Good work on ${type}, but you could use some more practice.`;
    } else {
      return `It seems you need to improve in ${type}. Let's focus on reinforcing these concepts.`;
    }
  };

  const getSuggestedNextSteps = (score: number, total: number, type: 'Logic' | 'Syntax') => {
    const percentage = (score / total) * 100;
    if (percentage < 50) {
      return `Take some additional practice questions in ${type} to reinforce your understanding.`;
    } else if (percentage < 80) {
      return `Consider reviewing some advanced ${type} concepts to strengthen your skills.`;
    } else {
      return `You can move on to more advanced topics in ${type}.`;
    }
  };

  return (
    <div className="container min-h-[100vh] p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-bold text-center mb-6">Test Results</h1>
      
      <div className="mb-4">
        <h2 className="text-xl">Logic Score: {logicScore} out of {logicQuestionsCount}</h2>
        <p>{getFeedback(logicScore, logicQuestionsCount, 'Logic')}</p>
        <p>{getSuggestedNextSteps(logicScore, logicQuestionsCount, 'Logic')}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl">Syntax Score: {syntaxScore} out of {syntaxQuestionsCount}</h2>
        <p>{getFeedback(syntaxScore, syntaxQuestionsCount, 'Syntax')}</p>
        <p>{getSuggestedNextSteps(syntaxScore, syntaxQuestionsCount, 'Syntax')}</p>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/learn/logic"
          className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-md w-full transition duration-300 mb-3"
        >
          Start Logic Practice
        </Link>
        <Link
          href="/learn/syntax"
          className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
        >
          Start Syntax Practice
        </Link>
      </div>
    </div>
  );
};

const InitTest = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finished, setFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnswerSelected = (answer: string, questionId: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Separate score calculation for logic and syntax questions
  const calculateScore = (): { logicScore: number; syntaxScore: number } => {
    const logicScore = questions.filter((question) => question.type === 'logic')
      .reduce((correctAnswers: number, question: Question) => 
        answers[question.id] === question.correctAnswer ? correctAnswers + 1 : correctAnswers, 
      0);

    const syntaxScore = questions.filter((question) => question.type === 'syntax')
      .reduce((correctAnswers: number, question: Question) => 
        answers[question.id] === question.correctAnswer ? correctAnswers + 1 : correctAnswers, 
      0);

    return { logicScore, syntaxScore };
  };

  const handleSubmit = () => {
    const { logicScore, syntaxScore } = calculateScore();
    // Guardar la puntuación en localStorage o contexto global
    localStorage.setItem('logicScore', logicScore.toString());
    localStorage.setItem('syntaxScore', syntaxScore.toString());
      
    setFinished(true);
    alert(`You finished the test! Your score:\nLogic: ${logicScore} out of ${questions.filter(q => q.type === 'logic').length}\nSyntax: ${syntaxScore} out of ${questions.filter(q => q.type === 'syntax').length}`);
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container min-h-[100vh] overflow-auto p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-3xl font-bold text-center mb-6">Initial Test:</h1>
      {!finished ? (
        <div>
          <QuestionComp
            key={questions[currentIndex].id}
            question={questions[currentIndex]}
            onAnswerSelected={handleAnswerSelected}
            questionIndex={currentIndex}
            selectedAnswer={answers[questions[currentIndex].id]}
          />
          
          <div className="flex justify-between mt-4">
            <button
              onClick={goToPreviousQuestion}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold p-2 rounded-md"
              disabled={currentIndex === 0}
            >
              Back
            </button>
            <div className="text-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-md w-full mt-4 transition duration-300"
                onClick={handleSubmit}
              >
                Finish Here
              </button>
            </div>
            <button
              onClick={goToNextQuestion}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold p-2 rounded-md"
              disabled={currentIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <ResultsPage 
          logicScore={calculateScore().logicScore} 
          syntaxScore={calculateScore().syntaxScore} 
        />
      )}
    </div>
  );
};

export default InitTest;

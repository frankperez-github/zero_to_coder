'use client'
import { useState } from 'react';
import { Question } from '../lib/questions';

interface QuestionProps {
  question: Question;
  onAnswerSelected: (answer: string, questionId: number) => void;
  questionIndex: number;
  selectedAnswer: string | null; // Receives selectedAnswer from parent
}

const QuestionComp: React.FC<QuestionProps> = ({
  question,
  onAnswerSelected,
  questionIndex,
}) => {
  const [showHint, setShowHint] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    onAnswerSelected(answer, question.id);  
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };


  return (
    <div className="mb-6 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Question {questionIndex + 1}
      </h3>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{question.question}</p>
      
      {/* Answer options */}
      <div className="flex flex-col space-y-3">
        {question.options.map((option) => (
          <button
            key={option}
            className={`p-3 rounded-md border-2 transition-all duration-300 ease-in-out hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 `}
            onClick={() => handleAnswerSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Show hint */}
      <button
        onClick={toggleHint}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-all duration-200"
      >
        {showHint ? 'Hide Hint' : 'Show Hint'}
      </button>
      {showHint && <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">{question.hint}</p>}
    </div>
  );
};

export default QuestionComp;

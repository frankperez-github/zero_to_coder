"use client";
import Question from "@/types/Question";
import { useState } from "react";

interface QuestionProps {
  question: Question;
  questionIndex: number;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  onAnswerSelected?: (answer: string, questionId: number) => void;
}

const QuestionComp: React.FC<QuestionProps> = ({
    question: currentQuestion,
    questionIndex: currentQuestionIndex,
    goToNextQuestion,
    onAnswerSelected,
    goToPreviousQuestion
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answered, setAnswered] = useState<boolean>(false);

    const handleAnswerSelected = (answer: string) => {
        setSelectedAnswer(answer);
        setAnswered(true);
        if(onAnswerSelected)
        {
            onAnswerSelected(answer, currentQuestionIndex);
        }
    };

    const handlePreviousQuestion = () => {
        setAnswered(false);
        setSelectedAnswer(null);
        goToPreviousQuestion();
    }

    const handleNextQuestion = () => {
        setAnswered(false);
        setSelectedAnswer(null);
        goToNextQuestion();
    };

    return (
        <div className="">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold">
                Question {currentQuestionIndex + 1}:
                </h2>
                <p className="text-lg">{currentQuestion?.text}</p>
            </div>

            <div className="mb-6 grid grid-cols-4 gap-10">
                {currentQuestion?.options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerSelected(option)}
                    className={`w-full p-3 mb-2 rounded-md text-lg font-semibold ${
                    selectedAnswer === option
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                    }`}
                >
                    {option}
                </button>
                ))}
            </div>

            {answered && (
                <div className="mb-4">
                {selectedAnswer === currentQuestion?.answer ? (
                    <p className="text-green-600">Correct! Well done.</p>
                ) : (
                    <p className="text-red-600">
                    Incorrect. The correct answer is: {currentQuestion?.answer}
                    </p>
                )}
                <div className="mt-4">
                    <p className="text-sm text-white">{currentQuestion?.explanation}</p>
                </div>
                </div>
            )}

            <div className="flex justify-evenly">
                {
                    currentQuestionIndex > 0 && (
                        <div className="flex justify-between w-1/4 mx-auto mt-20">
                            <button
                                onClick={handlePreviousQuestion}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                            >
                                Previous Question
                            </button>
                        </div>
                    )
                }
                
                <div className="flex justify-between w-1/4 mx-auto mt-20">
                    <button
                    onClick={handleNextQuestion}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                    disabled={!answered && currentQuestion?.options.length > 0}
                    >
                        Next Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionComp;

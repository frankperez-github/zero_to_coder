'use client'

import { useEffect, useState } from 'react';
import QuestionComp from '@/components/Question';
import Question from '@/types/Question';
import API from '@/api';

const ResultsPage = ({ logicScore, sintaxScore }: { logicScore: number; sintaxScore: number }) => {

    const [questions, setQuestions] = useState<Question[]>([]);
    useEffect(()=>{
        API.get('/questions', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const data = res.data;
            setQuestions(data);
        })
    },[])

    const logicQuestionsCount = questions.filter((q) => q.type === 'logic').length;
    const sintaxQuestionsCount = questions.filter((q) => q.type === 'sintax').length;

    // Calcular la retroalimentación y sugerencias basadas en la puntuación
    const getFeedback = (score: number, total: number, type: 'Logic' | 'Sintax') => {
        const percentage = (score / total) * 100;
        if (percentage >= 80) {
            return `You have a strong understanding of ${type} logic!`;
        } else if (percentage >= 50) {
            return `Good work on ${type}, but you could use some more practice.`;
        } else {
            return `It seems you need to improve in ${type}. Let's focus on reinforcing these concepts.`;
        }
    };

    const getSuggestedNextSteps = (score: number, total: number, type: 'Logic' | 'Sintax') => {
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
        <div className="min-h-[100vh] p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <h1 className="text-3xl font-bold text-center mb-6">Test Results</h1>
            
            <div className="mb-4">
                <h2 className="text-xl">Logic Score: {logicScore} out of {logicQuestionsCount}</h2>
                <p>{getFeedback(logicScore, logicQuestionsCount, 'Logic')}</p>
                <p>{getSuggestedNextSteps(logicScore, logicQuestionsCount, 'Logic')}</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl">Sintax Score: {sintaxScore} out of {sintaxQuestionsCount}</h2>
                <p>{getFeedback(sintaxScore, sintaxQuestionsCount, 'Sintax')}</p>
                <p>{getSuggestedNextSteps(sintaxScore, sintaxQuestionsCount, 'Sintax')}</p>
            </div>

            <div className="mt-6 gap-10 flex text-center">
                <button
                onClick={()=>location.href = `/learn/logic/${logicScore < 5 ? 'operations' : 'sequences'}/${logicScore < 3 ? 'easy' : logicScore < 5 ? 'medium' : 'hard'}`}
                className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                >
                    Start Logic Practice
                </button>
                <button
                onClick={()=>location.href = `/learn/sintax/lists/${sintaxScore < 3 ? 'easy' : sintaxScore < 5 ? 'medium' : 'hard'}`}
                className="bg-green-600 hover:bg-green-700 text-white font-bold p-3 rounded-md w-full transition duration-300"
                >
                    Start Sintax Practice
                </button>
            </div>
        </div>
    );
};

const InitTest = () => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [finished, setFinished] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [questions, setQuestions] = useState<Question[]>([]);
    
    useEffect(()=>{
        API.get('/questions', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            const data = res.data;
            setQuestions(data);
        })
    },[])

    const handleAnswerSelected = (answer: string, questionId: number) => {
        setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer,
        }));
    };

    // Separate score calculation for logic and sintax questions
    const calculateScore = (): { logicScore: number; sintaxScore: number } => {
        const logicScore = questions.filter((question) => question.type === 'logic')
        .reduce((correctAnswers: number, question: Question) => 
            answers[question.id] === question.answer ? correctAnswers + 1 : correctAnswers, 
        0);

        const sintaxScore = questions.filter((question) => question.type === 'sintax')
        .reduce((correctAnswers: number, question: Question) => 
            answers[question.id] === question.answer ? correctAnswers + 1 : correctAnswers, 
        0);

        return { logicScore, sintaxScore };
    };

    const handleSubmit = () => {
        const { logicScore, sintaxScore } = calculateScore();
        localStorage.setItem('logicScore', logicScore.toString());
        localStorage.setItem('sintaxScore', sintaxScore.toString());
        
        setFinished(true);
        alert(`You finished the test! Your score:\nLogic: ${logicScore} out of ${questions.filter(q => q.type === 'logic').length}\niyntax: ${sintaxScore} out of ${questions.filter(q => q.type === 'sintax').length}`);
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
        <div className="min-h-[100vh] overflow-auto p-4 w-full px-20 bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
            <h1 className="text-3xl font-bold text-center mb-6">Initial Test:</h1>
            {!finished ? (
                <div>
                <QuestionComp
                    key={questions[currentIndex]?.id}
                    question={questions[currentIndex]}
                    questionIndex={currentIndex}
                    goToNextQuestion={goToNextQuestion}
                    onAnswerSelected={handleAnswerSelected}
                    goToPreviousQuestion={goToPreviousQuestion}
                />
                
                <div className="flex justify-end mt-10">
                    <div className="text-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 px-10 text-white font-bold p-2 rounded-md w-full mt-4 transition duration-300"
                        onClick={handleSubmit}
                    >
                        Finish Test
                    </button>
                    </div>
                </div>
                </div>
            ) : (
                <ResultsPage 
                logicScore={calculateScore().logicScore} 
                sintaxScore={calculateScore().sintaxScore} 
                />
            )}
        </div>
    );
};

export default InitTest;
